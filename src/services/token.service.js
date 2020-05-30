const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

/**
 * 
 * @param {String} userId 
 * @param {String} secret 
 */
const generateToken = (userId, secret = config.jwt.secret) => {
    console.log("generateToken userId", userId)
    const payload = {
        sub: userId
    };
    return jwt.sign(payload, secret);
};


/**
 * 
 * @param {String} token 
 * @return {Object} user doc
 */
const verifyToken = async (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const userDoc = await User.findOne({ token, user: payload.sub });
    if (!userDoc) {
        throw 'Token not found';
    }
    return userDoc;
};

module.exports = {
    generateToken,
    verifyToken,
};