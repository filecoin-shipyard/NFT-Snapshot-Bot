const _ = require('lodash');
const PowergateService = require('./PowergateService');

const SampleImage = require('../SampleBase64Encoded1MBImage.json');

class DataStoreService {

  constructor(db) {
    this.db = db;
  }

  async saveThread(tweetId, userId, thread) {
    if (!thread || thread.length === 0) {
      throw new Error('Error: attempt to save an empty thread');
    }

    console.log('Saving thread for tweet ID', tweetId);

    console.log('Step 1 - Attempt to generate NFT metadata and push to IPFS for caching');

    const firstTweet = thread[thread.length-1];
    const firstTweetSnippet = `'${firstTweet.text.substring(0, 100)}...'`;
    const threadAuthorUsername = firstTweet.user.screen_name;
    const threadName = `${threadAuthorUsername} - ${firstTweetSnippet}`;

    const timestamp = Date.now();
    const metadata = {
      name: threadName,
      image: SampleImage.data,
      description: JSON.stringify(thread),
      attributes: {
        userId,
        tweetId,
        timestamp
      }
    };

    const ipfsHash = await PowergateService.addDataToIpfs(metadata);

    console.log('Step 2 - Attempt to store data in the db');
    return this.db
      .collection('tweets')
      .doc(_.toString(tweetId))
      .set({
        originalTweetId: tweetId,
        originalTaggerId: userId,
        timestamp,
        thread,
        ipfsHash,
        threadName,
      });
  }

  async getThread(tweetId) {
    return this.db
      .collection('tweets')
      .doc(_.toString(tweetId))
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
        return null;
      });
  }
}


module.exports = new DataStoreService(require('./Firestore'));
