const BlockChain = require('./BlockChain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('1f1ae14c1cdf5ed8dac0a35d7174238fefc9b4dc8026cd2c42ef2de2eb4f5c60');
const myWalletAddress = myKey.getPublic('hex');

const prismCoin = new BlockChain();

prismCoin.createTransaction(myWalletAddress, 'Anuj', 100, myKey);
// prismCoin.createTransaction('Shruti', myWalletAddress, 500, myKey);

console.log('mining new Block...');
prismCoin.minePendingTransactions(myWalletAddress);

console.log('Balance of Shahnawaz - ', prismCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', prismCoin.isChainValid());

prismCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', prismCoin.isChainValid());
