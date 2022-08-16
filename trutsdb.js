const axios = require("axios")
const express = require('express')
const ethers = require('ethers');
const path = require('path')
const mongoose = require("mongoose");
const chaindata = require('./models/tokenData')
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();
const App = express();
const dbURI = "mongodb+srv://mongodb:gEKaWkVzEeVmrw9@truts.h8dgkyl.mongodb.net/node-truts?retryWrites=true&w=majority"
const port = 3000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        App.listen(port)
        console.log('Connected to MongoDB Database');
    })
    .catch((err) => {console.log('Error connecting', err)});


    App.get('/token', async (req, res) => {
        let tokenCoinGecko = await CoinGeckoClient.coins.markets({ids:'ethereum'})
        let token = tokenCoinGecko.data[0];
        console.log(token)
        let tokenData = new chaindata({
            id    : token.id,
            current_price    : token.current_price,
            price_change_percentage_24h : token.price_change_percentage_24h,
            market_cap_rank   : token.market_cap_rank,
            market_cap      : token.market_cap,
            total_volume : token.total_volume,
            circulating_supply : token.circulating_supply,
            max_supply : token.max_supply,
            total_token_holders: token.total_token_holders,
            total_active_snapshot_members : 50000
        })
        tokenData.save()
            .then((result) =>{
                res.send(result)
            })
            .catch((err) => {console.log(err)})
    })

    App.get('/all-tokens', async (req, res) =>{
        chaindata.find()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {console.log(err)})
    })