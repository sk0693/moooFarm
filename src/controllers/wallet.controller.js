const httpStatus = require('http-status');
const { walletService } = require('../services');
const logger = require('../config/logger');


const createWallet = (req, res) => {
    walletService.CreateWalletDoc(req.body);
}

const depositAmount = async (req, res) => {
    try {
        const user = req.user;
        let wallet = await walletService.deposit(user.id, req.body.amount);
        return res.status(httpStatus.OK).send(wallet);
    } catch (error) {
        console.log("depositAmount..........error", error)
        return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

module.exports = {
    createWallet,
    depositAmount
};
