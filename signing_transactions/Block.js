const { SHA256 } = require('crypto-js');

class Block {
  constructor (timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash () {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock (difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
      this.nonce += 1;
      this.hash = this.calculateHash();
    }
    console.log('Block mined with hash - ', this.hash);
    // Change addBlock in BlockChain
  }

  hasValidTransaction () {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Block;