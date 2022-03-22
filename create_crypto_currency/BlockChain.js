const Block = require('./Block');
const Transaction = require('./Transaction');

class BlockChain {
  constructor () {
    this.chain = [
      this.createGenesisBlock()
    ];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  createGenesisBlock () {
    return new Block(Date.now(), [], '0');
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1];
  }

  // addBlock(data) {
  //   const newBlock = new Block(Date.now(), data, this.getLatestBlock().hash);
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }

  minePendingTransactions(minerAddress) {
    this.pendingTransactions.push(new Transaction(null, minerAddress, this.miningReward));
    const newBlock = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    this.pendingTransactions = [];
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  createTransaction(fromAddress, toAddress, amount) {
    this.pendingTransactions.push(new Transaction(fromAddress, toAddress, amount));
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    this.chain.forEach(block => {
      block.transactions.forEach(transaction => {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      });
    });
    return balance;
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