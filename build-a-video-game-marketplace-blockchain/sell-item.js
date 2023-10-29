import {
  getAddressItems,
  getItemPrice,
  getTransactions,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];
// Add your code below
let transactions = getTransactions();
const price = getItemPrice(itemSold)-5;

const sellerKeyPair = ec.keyFromPrivate(sellerPrivateKey);
const sellerAddress = sellerKeyPair.getPublic('hex');
const signature = sellerKeyPair.sign(sellerAddress + price + itemSold).toDER('hex');

const transaction = {
  buyerAddress: null,
  sellerAddress,
  price,
  itemSold,
  signature
}

const items = getAddressItems(sellerAddress);
if(items[itemSold] > 0){
  transactions.push(transaction);
  writeTransactions(transactions);
}else{
  console.log(`${sellerAddress} do not have enough items to sell ${itemSold}`);
}
