const express = require('express');
const walletController = require('../../controllers/wallet.controller');

const router = express.Router();


router.post('/deposit', walletController.depositAmount);

module.exports = router;