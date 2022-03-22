const { SHA256 } = require('crypto-js');

class Block {
  constructor (timestamp, data, previousHash = '') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash () {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  // new
  mineBlock (difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
      this.nonce += 1;
      this.hash = this.calculateHash();
    }
    console.log('Block mined with hash - ', this.hash);
  }
}

module.exports = Block;