

console.log("node proj")
const axios = require("axios")
const express = require('express')
const ethers = require('ethers');
const App = express();
const path = require('path')
const port = 8080

let proposalId = '0x5ef706871a7cfdd6024aea6041c7717feb9a9d328a168279720ae3262e0f170c';
let spaceId = 'aave.eth';
const getProposalFromSpaceId = async (spaceId) =>{
    let propsalCount = 0;
    let getproposals = await axios.get(`https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20spaceById%20%7B%0A%20%20space(id%3A%20%22${spaceId}%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20about%0A%20%20%20%20network%0A%20%20%20%20symbol%0A%20%20%20%20members%0A%20%20%7D%0A%7D%0A%0Aquery%20Proposals%20%7B%0A%20%20proposals(where%3A%20%7Bspace%3A%20%22${spaceId}%22%2C%20state%3A%20%22active%22%7D%2C%20orderBy%3A%20%22active%22%2C%20orderDirection%3A%20desc)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20body%0A%20%20%20%20choices%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20snapshot%0A%20%20%20%20state%0A%20%20%20%20author%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20proposal%20%7B%0A%20%20proposal(id%3A%20%22bafkreic2sezyt4xnxnp6uyrv7uyzrozmhe3cf6powbs4mnx6zod4vxk2km%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20body%0A%20%20%20%20choices%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20snapshot%0A%20%20%20%20state%0A%20%20%20%20author%0A%20%20%20%20created%0A%20%20%20%20scores%0A%20%20%20%20scores_by_strategy%0A%20%20%20%20scores_total%0A%20%20%20%20scores_updated%0A%20%20%20%20plugins%0A%20%20%20%20network%0A%20%20%20%20strategies%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20network%0A%20%20%20%20%20%20params%0A%20%20%20%20%7D%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20GetVotes%20%7B%0A%20%20votes(first%3A%201000%2C%20skip%3A%200%2C%20where%3A%20%7Bproposal%3A%20%22bafkreic2sezyt4xnxnp6uyrv7uyzrozmhe3cf6powbs4mnx6zod4vxk2km%22%7D%2C%20orderBy%3A%20%22created%22%2C%20orderDirection%3A%20desc)%20%7B%0A%20%20%20%20id%0A%20%20%20%20voter%0A%20%20%20%20vp%0A%20%20%20%20vp_by_strategy%0A%20%20%20%20vp_state%0A%20%20%20%20created%0A%20%20%20%20proposal%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%20%20choice%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`)
    let proposalArray = getproposals.data.data.proposals
    console.log(`No. of proposal ${spaceId}`,proposalArray.length)
}
const votesOfProposal = async (proposalId)=>{
    let yesCount = 0;

    //let getSpace = await axios.get('https://hub.snapshot.org/graphql?operationName=spaceById&query=query%20spaceById%7B%0A%20%20space(id%3A%20%22aave.eth%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20about%0A%20%20%20%20network%0A%20%20%20%20symbol%0A%20%20%20%20members%0A%20%20%7D%0A%7D%0Aquery%20Proposals%20%7B%0A%20%20proposals%20(%0A%20%20%20%20first%3A%2020%2C%0A%20%20%20%20skip%3A%200%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20space%3A%22aave.eth%22%2C%0A%20%20%20%20%20%20state%3A%20%22active%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20orderBy%3A%20%22active%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20body%0A%20%20%20%20choices%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20snapshot%0A%20%20%20%20state%0A%20%20%20%20author%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%2C%0A%0Aquery%20proposal%7B%0A%20%20proposal(id%3A%22bafkreic2sezyt4xnxnp6uyrv7uyzrozmhe3cf6powbs4mnx6zod4vxk2km%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20body%0A%20%20%20%20choices%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20snapshot%0A%20%20%20%20state%0A%20%20%20%20author%0A%20%20%20%20created%0A%20%20%20%20scores%0A%20%20%20%20scores_by_strategy%0A%20%20%20%20scores_total%0A%20%20%20%20scores_updated%0A%20%20%20%20plugins%0A%20%20%20%20network%0A%20%20%20%20strategies%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20network%0A%20%20%20%20%20%20params%0A%20%20%20%20%7D%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20GetVotes%7B%0A%20%20votes%20(%0A%20%20%20%20first%3A%201000%0A%20%20%20%20skip%3A%200%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20proposal%3A%20%22bafkreic2sezyt4xnxnp6uyrv7uyzrozmhe3cf6powbs4mnx6zod4vxk2km%22%0A%20%20%20%20%7D%0A%20%20%20%20orderBy%3A%20%22created%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20voter%0A%20%20%20%20vp%0A%20%20%20%20vp_by_strategy%0A%20%20%20%20vp_state%0A%20%20%20%20created%0A%20%20%20%20proposal%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%20%20choice%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A');
    let getVotes = await axios.get(`https://hub.snapshot.org/graphql?operationName=GetVotes&query=query%20spaceById%20%7B%0A%20%20space(id%3A%20%22aave.eth%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20about%0A%20%20%20%20network%0A%20%20%20%20symbol%0A%20%20%20%20members%0A%20%20%7D%0A%7D%0A%0Aquery%20Proposals%20%7B%0A%20%20proposals(first%3A%2020%2C%20skip%3A%200%2C%20where%3A%20%7Bspace%3A%20%22aave.eth%22%2C%20state%3A%20%22active%22%7D%2C%20orderBy%3A%20%22active%22%2C%20orderDirection%3A%20desc)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20body%0A%20%20%20%20choices%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20snapshot%0A%20%20%20%20state%0A%20%20%20%20author%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20proposal%20%7B%0A%20%20proposal(id%3A%20%22${proposalId}%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20body%0A%20%20%20%20choices%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20snapshot%0A%20%20%20%20state%0A%20%20%20%20author%0A%20%20%20%20created%0A%20%20%20%20scores%0A%20%20%20%20scores_by_strategy%0A%20%20%20%20scores_total%0A%20%20%20%20scores_updated%0A%20%20%20%20plugins%0A%20%20%20%20network%0A%20%20%20%20strategies%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20network%0A%20%20%20%20%20%20params%0A%20%20%20%20%7D%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20GetVotes%20%7B%0A%20%20votes(first%3A%201000%2C%20skip%3A%200%2C%20where%3A%20%7Bproposal%3A%20%22bafkreic2sezyt4xnxnp6uyrv7uyzrozmhe3cf6powbs4mnx6zod4vxk2km%22%7D%2C%20orderBy%3A%20%22created%22%2C%20orderDirection%3A%20desc)%20%7B%0A%20%20%20%20id%0A%20%20%20%20voter%0A%20%20%20%20vp%0A%20%20%20%20vp_by_strategy%0A%20%20%20%20vp_state%0A%20%20%20%20created%0A%20%20%20%20proposal%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%20%20choice%0A%20%20%20%20space%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`)
   
    let voteArray = getVotes.data.data.votes;
    //array.length to get the total votes

    voteArray.forEach(element => {
        if(element.choice == 1){
            yesCount++;
        }
    });
    console.log("Total vote count", voteArray.length)
    console.log("No. of yes votes", yesCount)
}

//votesOfProposal(proposalId)
getProposalFromSpaceId(spaceId)