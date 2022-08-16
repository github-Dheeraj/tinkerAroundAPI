const mongoose = require('mongoose')
const Schema = mongoose.Schema

// let getSpacesSchema = new Schema({
//     id : String,
//     name : String,
//     network : String,
//     symbol : String
// })

let getSpaceDataSchema = new Schema({
    id : String,
    name : String,
    network : String,
    symbol : String,
    avatar : String,
    domain : String,
    twitter: String,
    github : String,
    admins : [String],
    members : [String],
    followersCount : Number,
    proposalsCount : Number,
    proposals : [getProposalsForSpaceId]
})

let getProposalsForSpaceId = {
    id : String,
    title : String,
    body : String,
    choices : [String],
    start : Number,
    end : Number,
    snapshot    : Number,
    state : String,
    author : String,
    space :{
      id : String,
      name : String
    },
    votes : Number,
    scores :  [Number]
}
