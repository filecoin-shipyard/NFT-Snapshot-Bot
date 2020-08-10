const { createPow } = require("@textile/powergate-client");
const {Buffer} = require("buffer");

class PowergateService {
  constructor() {
    const host = process.env.POWERGATE_HOST // or whatever powergate instance you want

    const pow = createPow({ host })

    pow.ffs.create().then(({ token }) => {
      pow.setToken(token);
    });

    this.pow = pow;
  }

  async addDataToIpfs(data) {
    const buffer = Buffer.from(JSON.stringify(data));
    const { cid } = await this.pow.ffs.stage(buffer);
    return cid;
  }
}

module.exports = new PowergateService();