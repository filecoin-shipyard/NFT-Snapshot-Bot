## Dapp

### Prerequisites

The dapp requires a running [powergate](https://github.com/textileio/powergate) instance for two reasons:
* The twitter thread rollup [bot](../bot/README.md) pushes the ERC721 compliant metadata of a rolled up thread to the IPFS node that a shared powergate instance runs (hence why this is also a prerequisite for running the twitter bot)
* Powergate provides a nicer interface into the filecoin network for creating a storage deal. When someone purchases a rolled up thread and tokenises it on Ethereum, a storage deal has to be made on the filecoin network first. With the data source being the powergate IPFS node, a storage deal can be created off the back of this data source.

Powergate can either be run locally (by creating a devnet) or hosted. With the host address, the dapp's [Powergate service](./services/PowergateService.js) needs updating accordingly. Going forward, we aim to have this driven by a .env file but have been experiencing build issues regarding this.  

### Building and running 

The dapp has been Dockerised and therefore can be run as a Docker container. 

You could build and run it locally in the same way as the Docker file or you can generate a static version of the site by running:

```
npm run generate
```

which will generate a `dist/` directory in the project root

#### Local dev

* setup the project

`$ npm install`

* add `.env` file

```dotenv
PORT=3000
```

* run the project

`$ npm run dev`
