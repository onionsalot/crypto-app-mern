const Portfolio = require("../../models/portfolio");

module.exports = {
  index,
  create,
};

async function index(req, res, next) {
  const coinList = await Portfolio.find({});
  res.json(coinList)
}

async function create(req, res, next) {
  const data = {
    "user" : req.user._id,
    ...req.body
  }
  console.log(data)
  const createdPortfolio = await Portfolio.create(data);
  res.json(createdPortfolio)
}
