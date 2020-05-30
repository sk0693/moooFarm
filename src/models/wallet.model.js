const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { omit, pick } = require('lodash');

const walletSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        deposit: {
            type: Number,
            required: true,
            default: 0
        },
        bonus: {
            type: Number,
            required: true,
            default: 0
        },
        winnings: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);


walletSchema.methods.toJSON = function () {
    const wallet = this;
    return omit(wallet.toObject(), ['password']);
};

walletSchema.methods.transform = function () {
    const wallet = this;
    return pick(wallet.toJSON(), ['deposit', 'bonus', 'winnings']);
};

walletSchema.methods.transformToSum = function () {
    const wallet = this;
    return (this.deposit + this.bonus + this.winnings);
};

const wallet = mongoose.model('Wallet', walletSchema);

module.exports = wallet;
