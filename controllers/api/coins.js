const Coin = require("../../models/coin");

module.exports = {
  index,
  search,
  getOne,
};

async function index(req, res, next) {
  const coinList = await Coin.getAll();
  res.json(coinList)
}

async function search(req, res, next) {
  const coinList = await Coin.getSearch();
  res.json(coinList)
}

async function getOne(req, res, next) {
  const coin = await Coin.getOne(req.params.id);
  res.json(coin)
}