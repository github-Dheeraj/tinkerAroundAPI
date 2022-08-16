
const axios = require("axios")

let umaSafeAddress = '0x7C7a1407c35B695E4eE530D80d4bd4C1aF8569E5'
//1. Get All contract of the safe from offset, limit(count)
//This should update daily once, for all without limit
//Address, Name
const getGnosisSafeContracts = async(limit) =>{
    
    let getContracts = await axios.get(`https://safe-transaction.gnosis.io/api/v1/contracts/?limit=${limit}&offset=10`)
    console.log("Contract by limit", getContracts.data);
}


//2. Safe Balance, TokenAddress, Token {name, symbol,decimals, Image}, balance token
const getGnosisSafeBalance = async () =>{
    //let getproposals = await axios.get('https://safe-transaction.gnosis.io/api/v1/about/about/ethereum-rpc/')
    let getContractBalance = await axios.get("https://safe-transaction.gnosis.io/api/v1/safes/0x7C7a1407c35B695E4eE530D80d4bd4C1aF8569E5/balances")
    console.log('Gnosis contrart balance',getContractBalance.data)
}

//3. safe Data from Adrress, owner, fallback handler
const getSafeDataByAddress = async () =>{
    let getSafeData = await axios.get('https://safe-transaction.gnosis.io/api/v1/safes/0x7C7a1407c35B695E4eE530D80d4bd4C1aF8569E5/')
    console.log(getSafeData.data)
}

//Get Collectible, address,TokenName Tokensymbol, collectibleName(vitalik.eth), discription, imageUri
const getSafeCollectibleBalance =async()=>{
    let getSafeCollectibleData = await axios.get('https://safe-transaction.gnosis.io/api/v1/safes/0x7C7a1407c35B695E4eE530D80d4bd4C1aF8569E5/collectibles/?trusted=false&exclude_spam=false')
    console.log(getSafeCollectibleData.data)
}


//get DAte Created, creator Address,
const getSafeCreationData = async (address)=>{
    console.log('safeAddress:',address )
    let dataSafeCreation = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${address}/creation/`)
    console.log(dataSafeCreation.data)
}


//Get Safe Transfers Info, From, to, token value
const getSafeTranfersToFromValue = async(address)=>{

    let dataSafeTranfers = await axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${address}/transfers/?limit=2&offset=2`)
    console.log("safe transfer data:", dataSafeTranfers.data.results)
}



//getGnosisSafeContracts(20)
//getSafeCollectibleBalance()
getSafeCreationData(umaSafeAddress)
//getSafeTranfersToFromValue(umaSafeAddress)