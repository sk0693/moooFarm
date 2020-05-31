const httpStatus = require('http-status');
const { MfServices, walletService, userService } = require('../services');
const logger = require('../config/logger');

const getUserDetails = async (req, res) => {
  try {
    let user = req.user;
    return res.status(httpStatus.OK).send({ result: user });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};


const availService = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId } = req.body;
    if (!serviceId) {
      throw {
        status: httpStatus.BAD_REQUEST, message: "Please provide valid serviceId !!"
      }
    }

    let service = await MfServices.getActiveMFServiceById(serviceId);

    if (user.availedServices.includes(serviceId)) {
      throw {
        status: httpStatus.BAD_REQUEST, message: "This service is already availed by you !!"
      }
    }

    const userWallet = await walletService.getWallet(user.id);

    const { bonus, deposit, winnings } = userWallet;
    let deductedBonusPrice, deductedDepositPrice, deductedWinningsPrice;

    //1. Get Applicable Discount on Service 
    const discount = getDiscountedPrice(service, user.id);
    let applicableServicePrice = servicePrice = Math.floor(service.price - discount);

    //2. deduct from bonus amount
    deductedBonusPrice = deductionFromBonus(servicePrice, bonus);
    servicePrice -= deductedBonusPrice;

    //3. Deduct from deposits
    deductedDepositPrice = deductionFromDeposits(servicePrice, deposit);
    servicePrice -= deductedDepositPrice;

    //4. Deduct from winnings
    deductedWinningsPrice = deductionFromWinnings(servicePrice, winnings);
    servicePrice -= deductedWinningsPrice;

    // Update Avail Service in User Doc
    await userService.updateAfterAvailService(user.id, serviceId);

    // Update Wallet with new balance
    let newBalance = {
      bonus: bonus - deductedBonusPrice,
      deposit: deposit - deductedDepositPrice,
      winnings: winnings - deductedWinningsPrice
    }

    const newWalletbalance = await walletService.updateWallet(user.id, newBalance);

    const response = {
      result: "Congratulations the service has been activated !!",
      old_wallet: {
        total: userWallet.transformToSum(),
        wallet: userWallet.transform()
      },
      new_wallet: {
        total: newWalletbalance.transformToSum(),
        wallet: newWalletbalance.transform()
      }
    }

    return res.status(httpStatus.CREATED).send(response);

  } catch (error) {
    console.error("availService...............error", error);
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ error: true, message: error.message });
  }
}

const getDiscountedPrice = (service, userId) => {

  let serviceDiscountedPrice = 0;

  // check is user applicable for discount of this service
  const isUserApplicable = service.usersApplicableForDiscount.includes(userId);
  let discount = service.discount;
  if (discount > 0 && isUserApplicable) {
    serviceDiscountedPrice = Math.floor((service.price * discount) / 100);
  }

  return serviceDiscountedPrice;
}

const deductionFromBonus = (servicePrice, userBonusAmount) => {
  let deductedBonusAmt = 0;
  if (userBonusAmount > 0) {
    const percentageAmount = Math.floor((servicePrice * 10) / 100); // 10% price of service;
    deductedBonusAmt = Math.min(percentageAmount, userBonusAmount);
  }
  return deductedBonusAmt;
}

const deductionFromDeposits = (servicePrice, deposits) => {
  if (servicePrice == 0) {
    return 0;
  }
  return Math.min(servicePrice, deposits);
}

const deductionFromWinnings = (servicePrice, winnings) => {
  if (servicePrice == 0) {
    return 0;
  }

  if (winnings >= servicePrice) {
    return Math.min(servicePrice, winnings);
  }

  throw {
    status: httpStatus.BAD_REQUEST, message: "You dont have enough money to buy this service !!"
  }
}

module.exports = {
  getUserDetails,
  availService
};
