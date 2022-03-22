const Block = require('./Block');
const Transaction = require('./Transaction');

class BlockChain {
  constructor () {
    this.chain = [
      this.createGenesisBlock()
    ];
    this.difficulty = 2;
    this.pendingTransactions = [];
    // replace addBlock with minePendingTransactions
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

  // 1st
  minePendingTransactions(minerAddress) {
    this.pendingTransactions.push(new Transaction(null, minerAddress, this.miningReward));
    const newBlock = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    this.pendingTransactions = [];
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  // add key
  createTransaction(fromAddress, toAddress, amount, key) {
    if (!fromAddress || !toAddress) {
      throw new Error('Transaction must have from and to address')
    }
    const transaction = new Transaction(fromAddress, toAddress, amount);
    transaction.signTransaction(key)
    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction')
    }
    this.pendingTransactions.push(transaction);
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
      if (!currentBlock.hasValidTransaction()) {
        return false;
      }
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