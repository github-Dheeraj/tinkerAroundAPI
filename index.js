console.log("node proj")
const axios = require("axios")
const express = require('express')
const ethers = require('ethers');
const App = express();
const path = require('path')
const port = 8080
const etherscanAPIKey = '8EYDHVP2BJS69BAK6IHVACHBFK8AK9I5ZX'
const alchemyAPIKey = '3VDBZXBKxInSgBVC4Ku6yIDSsObPdBob'
const alchemyBaseURLOwnersCollection = `https://eth-mainnet.alchemyapi.io/nft/v2/${alchemyAPIKey}/getOwnersForCollection`;
const myCoinbaseAddress = '0x48c308b393a48f49f24c759d635c1c8e8f913213'

var maxNFTdataObj = {
    ownerAdd : '',
    ownerNFTcount : 0
}

const getTotalERC721ForAddress = async (ownerAddress)=>{
    //let response =await  axios.get('https://api.github.com/users/mapbox')
    //let response =await  axios.get('https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=8EYDHVP2BJS69BAK6IHVACHBFK8AK9I5ZX');
    let x =0;
    let responseE721 = await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${ownerAddress}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscanAPIKey}`)
    console.log(responseE721.data.result[0].contractAddress)
    let firstNFTContAddress = responseE721.data.result[0].contractAddress
    let ownersAddressNFTContact = await getTokenHoldersNFTContract(firstNFTContAddress)
    console.log("No of owners ",ownersAddressNFTContact.length)

    for(let i = 0; i < ownersAddressNFTContact.length; i++){
        let responseOwnerData = await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${ownersAddressNFTContact[i]}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscanAPIKey}`)
        let count = responseOwnerData.data.result.length
        console.log('count ', count)
    }

}

const getTokenHoldersNFTContract = async(contractAddress) =>{
    const contractAddr = contractAddress;
    console.log('nft contract address ',contractAddr)
    var config = {
    method: 'get',
    url: `${alchemyBaseURLOwnersCollection}?contractAddress=${contractAddr}`,
    headers: { }
    };

    let responseOwnersERC721 = await axios(config)
    console.log(responseOwnersERC721.data.ownerAddresses.length)

    return responseOwnersERC721.data.ownerAddresses;
}

getTotalERC721ForAddress(myCoinbaseAddress)


