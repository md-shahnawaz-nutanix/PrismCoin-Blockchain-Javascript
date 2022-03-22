// generates public private key
// helps to sign and verify signature
const EC = require('elliptic').ec;

// Pass elliptic curve
const ec = new EC('secp256k1');

const key = ec.genKeyPair();

const publicKey = key.getPublic('hex');

const privateKey = key.getPrivate('hex');

console.log('Public Key: ', publicKey);
console.log('Private Key: ', privateKey);