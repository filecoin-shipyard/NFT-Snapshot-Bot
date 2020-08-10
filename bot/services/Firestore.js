const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'nftsnapshotbot',
  keyFilename: './_keys/NFTSnapshotBot.json',
});

module.exports = db;
