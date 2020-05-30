const express = require('express');
const userRoute = require('./user.route');
const walletRoute = require('./wallet.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/wallet', walletRoute);

module.exports = router;
