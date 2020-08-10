const { createPow, ffs } = require("@textile/powergate-client");
const {Buffer} = require("buffer");

export default class PowergateService {
  constructor() {
    const host = "http://0.0.0.0:6002" // or whatever powergate instance you want

    this.pow = createPow({ host });
  }

  async requestToken() {
    const { token } = await this.pow.ffs.create();
    return token;
  }

  async setToken(token) {
    await this.pow.setToken(token);

    // Get ffs info
    const { info } = await this.pow.ffs.info();
    this.balancesList = info.balancesList;

    const {status} = await this.pow.health.check();
    this.status = status;
  }

  async addDataToIpfs(data) {
    const buffer = Buffer.from(JSON.stringify(data));
    const { cid } = await this.pow.ffs.addToHot(buffer);
    return cid;
  }

  async storeIpfsDataOnFileCoin(cid) {
    // const bytes = await this.pow.ffs.get(cid);
    // const data = String.fromCharCode.apply(String, bytes);
    // console.log('retrieved data');

    console.log(`Attempting to store [${cid}] on Filecoin`);

    let jobId;
    try {
      const result = await this.pow.ffs.pushConfig(cid);
      jobId = result.jobId;
    } catch (e) {
      console.log(e);
    }

    return jobId;
  }

  watchJob(jobId, callback) {
    // watch the FFS job status to see the storage process progressing

    // returns an object for cancelling the watch
    return this.pow.ffs.watchJobs(callback, jobId);
  }

  watchLogs(callback, cid) {
    // const pow = this.pow;
    // const getContent = async (cid) => {
    //   let bytes = await pow.ffs.get(cid);
    //   const string = new TextDecoder("utf-8").decode(bytes);
    //   console.log('retrieved data');
    //   console.log(string);
    // };

    return this.pow.ffs.watchLogs(callback, cid);

    //return this.pow.ffs.watchLogs((logEvent) => {
      //console.log(`received event for cid ${logEvent.cid}`)
      //console.log(`event`, logEvent)

      // --- Expected Event Messages Post Storage Deal ---
      // Hot-Storage execution ran successfully.
      // Ensuring Cold-Storage satisfies the configuration...
      // Current replication factor is lower than desired, making 1 new deals...
      // Calculating piece size...
      // Estimated piece size is 2097152 bytes.
      // Proposing deal to miner t01000 with 500000000 fil per epoch..
      // Watching deals unfold...
      // Deal with miner t01000 changed state to StorageDealValidating
      // Deal with miner t01000 changed state to StorageDealSealing
      // Deal 2 with miner t01000 is active on-chain
      // Cold-Storage execution ran successfully. -- TODO - could use the presence of this event to trigger minting

      //getContent(logEvent.cid)
    //}, cid);
  }

  async getJsonData(cid) {
    let bytes = await this.pow.ffs.get(cid);
    const decodeResult = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(decodeResult);
  }

  getBalancesList() {
    return this.balancesList;
  }

  getFfsStatus() {
    return this.status;
  }

  setTokenInLocalStorage(token) {
    console.log('Adding ffs token to local storage');
    localStorage.setItem('token', token);
  };

  getTokenFromStorage() {
    console.log('Retrieving ffs token from local storage');
    return localStorage.getItem('token');
  };

  clearTokenFromLocalStorage() {
    console.log('Clearing ffs token from local storage');
    localStorage.removeItem('token');
  }
}