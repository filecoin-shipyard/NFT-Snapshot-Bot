const _ = require('lodash');
const Twit = require('twit');

class TwitterService {

  constructor() {
    this.twit = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    this.db = require('./DataStoreService.js');
  }

  connectAndStartStreaming(onTweetCallback) {
    this.stream = this.twit.stream('statuses/filter', {
      track: process.env.TRACKED_WORD,
      retry: true
    });

    this.stream.on('connected', () => console.log('Twitter stream connected!'));

    this.stream.on('tweet', tweet => onTweetCallback(tweet));

    this.stream.on('error', e => console.error(`stream error: ${e}`));

    this.stream.on('disconnect', disconnectMessage => {
      console.error(`stream disconnected: ${disconnectMessage}`);
      this.stream.start();
    });
  }

  async getTweetThread(tweetId) {
    const thread = [];

    // what tweet are we looking at now
    let workingTweetId = tweetId;

    while (workingTweetId) {

      // Get the current tweet
      const tweet = await this.getTweetById(workingTweetId);

      // Check its valid
      if (!tweet) {
        console.log('No tweet found - stopping rollup');
        workingTweetId = null;
        return;
      }

      // Add tweet to thread list
      thread.push(tweet);

      // Update working tweet ID to get the next item in the thread
      if (tweet.reply_id) {
        workingTweetId = tweet.reply_id;
      } else {
        console.log('Exhausted thread - stopping rollup');
        workingTweetId = null;
      }
    }

    return _.compact(thread);
  }

  async getTweetById(tweetId) {
    try {
      console.log('Getting tweet by ID', tweetId);

      const tweet = await this.twit.get('statuses/show', {id: tweetId});

      if (!tweet || tweet.resp.statusCode !== 200) {
        console.error('No tweet found or status code not 200 from API');
        return null;
      }

      const {data} = tweet;
      const {user, id_str, created_at, text, in_reply_to_status_id_str} = data;

      return {
        // Grab some tweet data
        id_str,
        created_at,
        text,
        reply_id: in_reply_to_status_id_str,

        // Grab some user data
        user: {
          id_str: user.id_str,
          name: user.name,
          screen_name: user.screen_name,
          description: user.description,
          created_at: user.created_at,
          profile_image_url: user.profile_image_url,
          profile_image_url_https: user.profile_image_url_https,
          profile_background_color: user.profile_background_color,
          profile_text_color: user.profile_text_color,
          profile_use_background_image: user.profile_use_background_image,
        },
      };
    } catch (e) {
      console.error(`Unable to get tweet for ID [${tweetId}]`, e);
      return null;
    }
  };

  async tweetRollupConfirmation(tweetId) {
    console.log(`Posting tweet rollup confirmation`, tweetId);

    return this.twit.post('statuses/update', {
      status: `Rollup created - claim ownership of the unstoppable NFT here - https://rollup.blockrocket.tech/gallery/${tweetId}`,
      in_reply_to_status_id: tweetId
    });
  }
}

module.exports = TwitterService;
