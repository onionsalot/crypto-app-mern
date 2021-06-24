const request = require('request');
const rootUrl = 'https://api.coingecko.com/api/v3/';
const fetch = require('node-fetch');

module.exports = {
    getAll,
    getSearch
  };
  

async function getAll() {
    const response = await fetch(
        `${rootUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d`
    )
    const coins = await response.json();
    const coinList = coins.map((e) => {
        return {
            'id': e.id,
            'ticker': e.symbol,
            'name': e.name,
            'price': e.current_price,
            'market_cap': e.market_cap,
            'rank': e.market_cap_rank,
            'price1h': e.price_change_percentage_1h_in_currency,
            'price24h': e.price_change_percentage_24h_in_currency,
            'price7d': e.price_change_percentage_7d_in_currency,
            'price14d': e.price_change_percentage_14d_in_currency
        }
    })
    return coinList
}


async function getSearch() {
    const response = await fetch(
        `${rootUrl}coins/list`
    )
    const coins = await response.json();
    const coinList = coins.map((e) => {
        return {
            'value': e.id,
            'symbol': e.symbol,
            'label': e.name
        }
    })
    return coinList
}

const coin = [
    {ticker:"btc", name:"bitcoin", price:10000},
    {ticker:"eth", name:"ethereum", price:10000},
    {ticker:"etc", name:"ethereum classic", price:10000},
    {ticker:"ada", name:"cardana", price:10000},
    {ticker:"xrp", name:"ripple", price:10000},
    {ticker:"doge", name:"doge", price:10000},
]
