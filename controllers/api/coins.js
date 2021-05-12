const Coin = require("../../models/coin");

module.exports = {
  index,
};

async function index(req, res, next) {
  const coinList = await Coin.getAll();
  console.log(coinList)
  res.json(coinList)
}