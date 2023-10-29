import {
  getTransactions,
  writeTransactions,
  getWallets,
  writeWallets
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const newWalletName = process.argv[2];
// Add your code below
const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

let wallets = getWallets();

if(!wallets.hasOwnProperty(newWalletName)){
  wallets[newWalletName] = {
    publicKey,
    privateKey
  };
  writeWallets(wallets);

  let transactions = getTransactions();
  const transaction = {
    buyerAddress: null,
    sellerAddress: publicKey,
    price: 40
  }
transactions.push(transaction);
writeTransactions(transactions);

}