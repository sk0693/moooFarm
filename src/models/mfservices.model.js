const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { omit, pick } = require('lodash');

const mfServiceSchema = mongoose.Schema(
  {
    isActivated: {
      type: Boolean,
      required: true,
      default: true
    },
    price: {
      type: Number,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true
    },
    description: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number
    },
    usersApplicableForDiscount: {
      type: Array
    }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

mfServiceSchema.methods.transform = function () {
  const file = this;
  return omit(file.toObject(), ['_id']); //pick(user.toJSON(), ['id', 'email', 'name']);
};

const Mfservice = mongoose.model('Mfservice', mfServiceSchema);

module.exports = Mfservice;
