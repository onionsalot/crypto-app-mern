const Portfolio = require("../../models/portfolio");
const Coin = require("../../models/coin")

module.exports = {
  index,
  create,
  update,
  addCoin,
  getOne,
  deleteOne,
};

async function index(req, res, next) {
  const portfolioList = await Portfolio.find({user: req.user._id});
  const arr = []
  portfolioList.forEach((portfolio, idx) =>
    portfolio.coins.forEach((coin, idx) =>
      arr.push(coin.id)))
  const uniqueArray = [...new Set(arr)];//convert array of dupes to a set which implicitly removes dupes then convert back to array.
  if (uniqueArray.length !== 0) {
    const coinList = await Coin.getMultiplePrice(uniqueArray.join('%2C'))
    portfolioList.forEach((portfolio, idx1) =>
      portfolio.coins.forEach((coin, idx2) =>
        portfolioList[idx1].coins[idx2] = {
          ...coin,
          ...coinList[`${coin.id}`]
        }))
  }
  res.json(portfolioList)
}

async function getOne(req, res, next) {
  const portfolio = await Portfolio.findById(req.params.id)
  if (String(portfolio.user) !== String(req.user._id)) {
    // check if current logged in user has access to this item..
    return res.json({error: "invalid user"})
  }
  const arr = []
    portfolio.coins.forEach((coin, idx) => arr.push(coin.id))
    const uniqueArray = [...new Set(arr)];//convert array of dupes to a set which implicitly removes dupes then convert back to array.
    if (uniqueArray.length !== 0) {
      const coinList = await Coin.getMultiplePrice(uniqueArray.join('%2C'))
      portfolio.coins.forEach((coin, idx) =>
        portfolio.coins[idx] = {
          ...coin,
          ...coinList[`${coin.id}`]
      })
    }
  res.json(portfolio)
}

async function create(req, res, next) {
  const data = {
    "user" : req.user._id,
    ...req.body
  }
  const portfolio= await Portfolio.find({user: req.user._id});
  if (portfolio.length === 0) {
    data.isDefault = true
  }
  const createdPortfolio = await Portfolio.create(data);
  res.json(createdPortfolio)
}

async function update(req, res, next) {
  // For general purpose updating such as name. If used for updating coins, will need to replace entire array of coins(!)
  const id = req.params.id;
  const data = req.body;
  const many = await Portfolio.updateMany({"user": req.user._id}, {$set: {"isDefault":false}})
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, data, {new:true})
  res.json({ success: true, updatedPortfolio })
}

async function addCoin(req, res, next) {
  try {
    // Currently pushes to coin array but doesn't respond with updated info...
    const id = req.params.id;
    const cid = req.params.cid;
    // const addedCoin = await Portfolio.findById(id, async function(err, portfolio) {
    //   portfolio.coins= []
    //   console.log(portfolio.coins)
    //   portfolio.save();
    // }).then(response => res.json(response))
    const test = `coins.${cid}`
    const addedCoin = await Portfolio.findOneAndUpdate({_id: id, 'coins.id': {$ne: cid}}, {$push: {"coins": {"id": cid, "quantity":Number(req.body.quantity)}}},{ returnOriginal: false })
    const addedQuantity = await Portfolio.findOneAndUpdate({_id: id, "coins.id": cid}, {$set: {"coins.$.quantity": Number(req.body.quantity)}},{ returnOriginal: false })
    res.json({success:true, addedQuantity})
  } catch(err) {
    res.send(err)
  }
}

async function deleteOne(req, res, next) {
  try{
    const id = req.params.id;
    const removedPortfolio = await Portfolio.findByIdAndRemove(id)
    res.json({ success: true, removedPortfolio })
  } catch(err) {
    res.send(err)
  }
}