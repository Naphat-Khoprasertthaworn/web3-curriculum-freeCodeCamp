const { addTransaction, updateContractState } = (await import('./blockchain-helpers.js'));

const contractState = JSON.parse(process.env.CONTRACT_STATE);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY; // contract private key
const creatorAddress = process.env.CREATOR_ADDRESS; // target public key
const transaction = JSON.parse(process.env.TRANSACTION);
// Add your code below

// console.log(contractState,
//     contractAddress,
//     privateKey,
//     creatorAddress,
//     blockchainLength)

const funds = getAddressBalance(contractAddress)

// console.log(funds)

if ( funds >= 150 ){
    addTransaction(privateKey,creatorAddress,funds)

    contractState.status = "closed"
    contractState.description = "Smart contract to raise funds for my start up."
    updateContractState(contractAddress,contractState)

}
