const Portfolio = require("../../models/portfolio");

module.exports = {
  index,
};

async function index(req, res, next) {
  const coinList = await Portfolio.getAll();
  res.json(coinList)
}

