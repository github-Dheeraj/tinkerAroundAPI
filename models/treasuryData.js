const mongoose = require('mongoose')
const Schema = mongoose.Schema


//1. Get All contract of the safe from offset, limit(count)
//This should update daily once, for all without limit
//Address, Name
// const getGnosisSafeContracts = async(limit) =>{
    
//     let getContracts = await axios.get(`https://safe-transaction.gnosis.io/api/v1/contracts/?limit=${limit}&offset=50`)
//     console.log("Contract by limit", getContracts.data);
// }
let getSafeContracts = new Schema({
    address: String,
    name: String
})


// //2. safe Data from Adrress, owner, fallback handler
// const getSafeDataByAddress = async (safeAddress) =>{
//     let getSafeData = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${safeAddress}/`)
//     console.log('getSafeDataByAddress address owner   ', getSafeData.data)
// }
//@dev for Date
// //get DAte Created, creator Address,
// const getSafeCreationData = async (safeAddress)=>{
//     console.log('safeAddress:',safeAddress )
//     let dataSafeCreation = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${safeAddress}/creation/`)
//     console.log(dataSafeCreation.data)
// }

let getContractOwnersData = new Schema({
    address: String,
    name: String,
    owners : [String],
    createdDate: Date,
    masterCopy : String,
    modules : [String],
    fallbackHandler: String,
    tokenBalance :[getSafeTokenBalancesData],
    collectibleBalance : [getSafeCollectibleBalanceData],
    safePayouts : [getSafePayoutsData]
})

// //3. Safe Balance, TokenAddress, Token {name, symbol,decimals, Image}, balance token
// const getGnosisSafeBalance = async (safeAddress) =>{
//     let getContractBalance = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${safeAddress}/balances`)
//     console.log('Gnosis contrart balance: ' , (getContractBalance.data[1].balance))
// }

//make it an array of token Data
let getSafeTokenBalancesData = {
    
        tokenAddress : String,
        token : {
            name: String,
            symbol: String,
            decimals: Number,
            logoUri : String
        },
        balance : Number
}



// //Get Collectible, address,TokenName Tokensymbol, collectibleName(vitalik.eth), discription, imageUri
// const getSafeCollectibleBalance =async(safeAddress)=>{
//     let getSafeCollectibleData = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${safeAddress}/collectibles/?trusted=false&exclude_spam=false`)
//     console.log('getSafeCollectibleData ', getSafeCollectibleData.data)
// }
//make it an array of Collectible Data
let getSafeCollectibleBalanceData = {

    address: String,
    tokenName   : String,
    tokenSymbol: String,
    name: String,
    imageUri: String,
    metadata : {
        name: String,
        description: String,
        image: String
    }
}

// //Get Safe Transfers Info, From, to, token value
// const getSafeTranfersToFromValue = async(safeAddress)=>{

//     let dataSafeTranfers = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${safeAddress}/transfers/?limit=2&offset=2`)
//     console.log("safe transfer data:", dataSafeTranfers.data.results)
// }

let getSafePayoutsData = {
    transferType : String,
    executionDate : String,
    transactionHash : String,
    toAddress : String,
    value : Number,
    tokenInfo : {
        type : String,
        tokenAddress : String,
        name: String,
        symbol: String,
        decimals: Number,

    }
}
