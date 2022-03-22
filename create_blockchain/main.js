const BlockChain = require('./BlockChain');

const prismCoin = new BlockChain();
prismCoin.addBlock({ amount: 4 });
prismCoin.addBlock({ amount: 10 });
console.log(JSON.stringify(prismCoin, null, 4))

console.log('Is Valid - ', prismCoin.isChainValid());

prismCoin.chain[1].data = { amount: 100 };

console.log('Is Valid - ', prismCoin.isChainValid());

prismCoin.chain[1].hash = prismCoin.chain[1].calculateHash();

console.log('Is Valid - ', prismCoin.isChainValid());