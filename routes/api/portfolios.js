const express = require('express');
const router = express.Router();
const portfoliosCtrl = require('../../controllers/api/portfolios');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, portfoliosCtrl.index);
router.get('/:id', ensureLoggedIn, portfoliosCtrl.getOne)
router.post('/create', ensureLoggedIn, portfoliosCtrl.create)
router.put('/update/:id', ensureLoggedIn, portfoliosCtrl.update)
router.put('/:id/add/:cid', ensureLoggedIn, portfoliosCtrl.addCoin)

module.exports = router;