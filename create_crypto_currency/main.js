const BlockChain = require('./BlockChain');

const prismCoin = new BlockChain();

prismCoin.createTransaction('Shahnawaz', 'Anuj', 100);
prismCoin.createTransaction('Shruti', 'Shahnawaz', 500);

console.log('mining new Block...');
prismCoin.minePendingTransactions('Shahnawaz');

console.log('Balance of Shahnawaz - ', prismCoin.getBalanceOfAddress('Shahnawaz'));
