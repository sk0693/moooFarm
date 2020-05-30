const httpStatus = require('http-status');
const { Wallet } = require('../models');


//---------------------------------------helper functions----------------------------------------
const giveIncentives = async (userId, depositAmount) => {
  // return random number(percentage) from 0 to 100  
  return Math.floor(Math.random() * 101);
}
// -------------------------------------helper functions end-------------------------------------


/**
 * 
 * @param {Object} body 
 * @return {object } tinyUrl doc type object
 * 
 * It will take body to create the new doc;
 */
const CreateWalletDoc = async body => {
  const wallet = await Wallet.create(body);
  return wallet;
};

/**
 * 
 * @param {String} tinyUrl 
 * @return {object } tinyUrl doc type object
 * 
 */
const getWallet = async (userId) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw { status: httpStatus.NOT_FOUND, message: 'No wallet found with this userId' };
  }
  return wallet;
};

const deposit = async (userId, depositAmount) => {
  if (depositAmount <= 0) {
    throw { status: httpStatus.BAD_REQUEST, message: 'Deposit Amount should be greater than 0' };
  }
  let percentage = await giveIncentives(userId);
  let bonus = Math.floor((depositAmount * percentage) / 100);

  // console.log("bonus", bonus, percentage)
  // console.log("depositAmount", depositAmount)
  // console.log("wallet", wallet);
  const updatedWallet = await Wallet.findOneAndUpdate({ userId }, {
    $inc: {
      bonus,
      deposit: depositAmount
    }
  }, { new: true })

  return updatedWallet.transform();
}

const updateWallet = async (userId, body) => {
  const wallet = await Wallet.findOneAndUpdate(userId, {
    $set: {
      bonus: body.bonus,
      deposit: body.deposit,
      winnings: body.winnings,
    }
  }, {
    new: true
  });

  return wallet;
}


module.exports = {
  CreateWalletDoc,
  getWallet,
  deposit,
  updateWallet
};
