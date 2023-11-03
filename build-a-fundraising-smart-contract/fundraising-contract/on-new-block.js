const { addTransaction, updateContractState, getBlockchain, getTransactions } = (await import('./blockchain-helpers.js'));

const contractState = JSON.parse(process.env.CONTRACT_STATE);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const creatorAddress = process.env.CREATOR_ADDRESS;
const blockchainLength = process.env.BLOCKCHAIN_LENGTH;
// Add your code below

// console.log(contractState,
//     contractAddress,
//     privateKey,
//     creatorAddress,
//     blockchainLength)

if(blockchainLength >= 7){
    const blockchain = getBlockchain()
    const transaction = getTransactions()

    for (let i = 1; i < blockchain.length; i++) {
        const { hash, previousHash, nonce, transactions, smartContracts } = blockchain[i];
        for (let i = 1; i < transactions.length; i++) {
            const { fromAddress,toAddress,amount } = transactions[i];
            if (toAddress === contractAddress){
                addTransaction( privateKey,fromAddress,amount )
            }
        }
    }

    for (let i = 1; i < transaction.length; i++) {
        const { fromAddress,toAddress,amount } = transaction[i];
        if (toAddress === contractAddress){
            addTransaction( privateKey,fromAddress,amount )
        }
    }


    //let state = contractState
    contractState.status = "closed"
    updateContractState(contractAddress,contractState)
    console.log("close this smart contract")
}
