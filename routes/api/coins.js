const express = require('express');
const router = express.Router();
const coinsCtrl = require('../../controllers/api/coins');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', coinsCtrl.index);

module.exports = router;