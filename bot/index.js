// Bootstrap env configuration
const dotenv = require('dotenv');

const result = dotenv.config({path: `.env`});
if (result.error) throw result.error;

const TwitterService = require('./services/TwitterService');
const dataStore = require('./services/DataStoreService');

(async function runBot() {
  const twitterService = new TwitterService();

  // FIXME - Move callback into a thread processing service

  twitterService.connectAndStartStreaming(async (tweet) => {
    console.log(tweet);

    const userId = tweet.user.id_str;
    const tweetId = tweet.id_str;

    const existingThread = await dataStore.getThread(tweetId);
    if (existingThread) {
      console.log('Found existing thread - not rolling up again', existingThread);
      return;
    }

    const thread = await twitterService.getTweetThread(tweetId);
    console.log('thread', thread);

    await dataStore.saveThread(tweetId, userId, thread);

    await twitterService.tweetRollupConfirmation(tweetId, userId);

  });

})();
