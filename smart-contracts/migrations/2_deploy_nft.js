const {getAccountAddress} = require('@blockrocket/utils');
const INFURA_KEY = process.env.PROTOTYPE_BR_INFURA_KEY || '';
const MNEMONIC = process.env.PROTOTYPE_BR_MNEMONIC || '';

const TwitterThreadSnapshot = artifacts.require('TwitterThreadSnapshot');

module.exports = async function (deployer, network, accounts) {
  console.log('Deploying NFT on network: ' + network);

  const admin = getAccountAddress(accounts, 0, network, MNEMONIC, INFURA_KEY);

  await deployer.deploy(TwitterThreadSnapshot, {from: admin});
}