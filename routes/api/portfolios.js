const express = require('express');
const router = express.Router();
const portfoliosCtrl = require('../../controllers/api/portfolios');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', portfoliosCtrl.index);

module.exports = router;