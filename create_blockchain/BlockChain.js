const Block = require('./Block');

class BlockChain {
  constructor () {
    this.chain = [
      this.createGenesisBlock()
    ];
  }

  createGenesisBlock () {
    return new Block(Date.now(), { name: 'Genesis Block' }, '0');
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = new Block(Date.now(), data, this.getLatestBlock().hash);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = BlockChain;