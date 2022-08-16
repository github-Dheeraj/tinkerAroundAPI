const mongoose = require('mongoose')
const Schema = mongoose.Schema


// //5. Make Function to fet various data
// //{id, symbol , name}
// //THis should run once per day
// var getIdlistofCoins = async() => {
//     let dataList = await CoinGeckoClient.coins.list();
//     console.log(dataList.data.length)
// };

let tokenListSchema = new Schema({
    id : String,
    symbol  : String,
    name    : String
})

// //6. Get market data of all coins
// //will get all this data in USD, Image, Symbol , name, last price, volume , supply, 
// //*****most Important */
// var getCoinsMarketData = async() =>{
//     let dataMarket = await CoinGeckoClient.coins.markets({ids:'bitcoin'})
//     console.log(dataMarket.data[0])
// }

let tokenDataSchema = new Schema({

    id    : String,
    symbol  : String,
    name    : String,
    current_price    : Number,
    price_change_percentage_24h : Number,
    market_cap_rank   : Number,
    market_cap      : Number,
    total_volume : Number,
    circulating_supply : Number,
    max_supply : Number,
    total_token_holders: Number,
    total_active_snapshot_members : Number

}, {timestamps: true})
const chaindata = mongoose.model('chaindata', tokenDataSchema)
module.exports  = chaindata;
