const _ = require('lodash');

const getNetIdString = (web3) => {
  return web3.eth.net.getId()
    .then((id) => {
      // N.B - be careful changing this as the warning banner uses this string
      console.log(`Running on network ID ${id}`);
      switch (id) {
        case 1:
          return {id: 1, human: 'Main', firebasePath: 'mainnet'};
        case 3:
          return {id: 3, human: 'Ropsten', firebasePath: 'ropsten'};
        case 4:
          return {id: 4, human: 'Rinkeby', firebasePath: 'rinkeby'};
        case 42:
          return {id: 42, human: 'kovan', firebasePath: 'mainnet'};
        default:
          return {id: 5777, human: 'Local', firebasePath: 'local'};
      }
    });
};

const getEtherscanAddress = (web3) => {
  return web3.eth.net.getId()
    .then((id) => {
      return lookupEtherscanAddress(id);
    })
    .then((etherScanAddress) => {
      console.log(`Setting etherscan address as [${etherScanAddress}]`);
      return etherScanAddress;
    });
};

const lookupEtherscanAddress = (id) => {
  switch (id) {
    case 1:
      return 'https://etherscan.io';
    case 3:
      return 'https://ropsten.etherscan.io';
    case 4:
      return 'https://rinkeby.etherscan.io';
    case 42:
      return 'https://kovan.etherscan.io';
    default:
      return '';
  }
};

export {
  getNetIdString,
  getEtherscanAddress,
  lookupEtherscanAddress,
};
