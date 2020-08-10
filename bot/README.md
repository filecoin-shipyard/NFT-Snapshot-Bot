## Twitter Rollup Bot

### Prerequisites

#### Powergate
The bot requires a running [powergate](https://github.com/textileio/powergate) instance as it generates ERC721 compliant metadata for a tokenised twitter thread that has been rolled up. This metadata is then pushed to the IPFS node that the Powergate instance spins up. Later in the purchase flow this becomes the data source for the storage persisted on Filecoin.

Powergate can either be run locally (by creating a devnet) or hosted. With the host address, the bots's [env file](./.env.example) variable `POWERGATE_HOST` needs updating accordingly.

#### Firebase Admin SDK keys

A `_keys` folder with a JSON file called `NFTSnapshotBot.json` is required at the root of the folder. 

The admin SDK keys are required in order to write data to a firestore for later retrieval in the dapp.

#### Env file

Create a `.env` file populated with the correct env vars (see `.env.example`).

```dotenv
TWITTER_CONSUMER_KEY=<TWITTER_CONSUMER_KEY>
TWITTER_CONSUMER_SECRET=<TWITTER_CONSUMER_SECRET>
TWITTER_ACCESS_TOKEN=<TWITTER_ACCESS_TOKEN>
TWITTER_ACCESS_TOKEN_SECRET=<TWITTER_ACCESS_TOKEN_SECRET>
TRACKED_WORD='<word-to-track>'
```

### Running the bot

With the above prerequisites satisfied you can:

Run `npm run start` to run the bot locally.
