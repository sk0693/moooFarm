const httpStatus = require('http-status');
const { userService, tokenService, walletService } = require('../services');
const logger = require('../config/logger');


const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const response = user.transform();

    let body = {
      userId: user.id
    }

    await walletService.CreateWalletDoc(body)

    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    logger.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    const token = await tokenService.generateToken(user._id);
    await userService.saveToken(token, user.id)

    let wallet = await walletService.getWallet(user.id);

    wallet = wallet.transform();

    const response = { user: user.transform(), token, wallet };

    // res.cookie('jwt',token, { maxAge: 9000000, httpOnly: true });

    return res.send(response);
  } catch (error) {
    logger.error(error);
    return res.status(error.status || 500).json(error.message);
  }
};


const loginUsingGetAPI = async (req, res) => {
  try {
    // const {email, password} = req.query
    const user = await userService.loginUser(req.query.email, req.query.password);
    const token = await tokenService.generateToken(user._id);
    await userService.saveToken(token, user.id)

    const response = { user: user.transform(), token };

    res.cookie('jwt', 'Bearer ' + token, { maxAge: 900000, httpOnly: true });

    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(error.status).json(error.message);
  }
};


module.exports = {
  register,
  login,
  loginUsingGetAPI
};
