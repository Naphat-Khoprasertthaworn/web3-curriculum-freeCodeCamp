import {
  getBlockchain,
  getTransactions,
  writeBlockchain,
  writeTransactions
} from './blockchain-helpers.js';

import sha256 from 'crypto-js/sha256.js';
// Add your code below
const blockchain = getBlockchain();
const previousBlock = blockchain[blockchain.length - 1]
const transactions = getTransactions();

let nonce = 0;
const difficulty = 2;
let hash;
while(true){
  hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString()
  if( !hash.startsWith('0'.repeat(difficulty)) ){
    nonce++;
  }else{
    break;
  }
}

const newBlock = {
  hash,
  nonce,
  previousHash: previousBlock.hash,
  transactions
}

blockchain.push(newBlock);
writeBlockchain(blockchain);
writeTransactions([]);
