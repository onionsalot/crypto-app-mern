const Portfolio = require("../../models/portfolio");

module.exports = {
  index,
  create,
  update,
  addCoin,
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

async function update(req, res, next) {
  // For general purpose updating such as name. If used for updating coins, will need to replace entire array of coins(!)
  const url = req.params.id;
  const data = req.body;
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(url, data, {new:true})
  res.json(updatedPortfolio)
}

async function addCoin(req, res, next) {
  try {
    // Currently pushes to coin array but doesn't respond with updated info...
    const id = req.params.id;
    const cid = req.params.cid;
    const addedCoin = await Portfolio.findById(id, async function(err, portfolio) {
      portfolio.coins.push(cid);
      portfolio.save();
    }).then(response => res.json(response))
  } catch(err) {
    res.send(err)
  }
}