const express = require('express');
const router = express.Router();
const coinsCtrl = require('../../controllers/api/coins');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', coinsCtrl.index);
router.get('/search', coinsCtrl.search);
router.get('/searchDefault', coinsCtrl.getDefault)
router.get('/:id', coinsCtrl.getOne)

module.exports = router;