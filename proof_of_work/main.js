const BlockChain = require('./BlockChain');

const prismCoin = new BlockChain();
console.log('Mining block 1...')
prismCoin.addBlock({ amount: 4 });
console.log('Mining block 2...')
prismCoin.addBlock({ amount: 10 });
