const request = require('request');
const rootUrl = 'https://api.coingecko.com/api/v3/';
const fetch = require('node-fetch');

module.exports = {
    getAll,

  };
  

async function getAll() {
    const response = await fetch(
        `${rootUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=1h`
    )
    const coins = await response.json();
    return coins
}

const coin = [
    {ticker:"btc", name:"bitcoin", price:10000},
    {ticker:"eth", name:"ethereum", price:10000},
    {ticker:"etc", name:"ethereum classic", price:10000},
    {ticker:"ada", name:"cardana", price:10000},
    {ticker:"xrp", name:"ripple", price:10000},
    {ticker:"doge", name:"doge", price:10000},
]
