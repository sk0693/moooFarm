const httpStatus = require('http-status');
const { MFService, Discounts } = require('../models');

/**
 * 
 * @param {Object} body 
 * @return {object } moooFarm Service doc type object
 * 
 * It will take body to create the new doc;
 */
const CreateService = async body => {
  const service = await MFService.create(body);
  return service;
};

/**
 * 
 * @param {String} serviceId 
 * @return {object } moooFarm Service doc type object
 * 
 * It will take body to create the new doc;
 */
const getActiveMFServiceById = async serviceId => {

  const service = await MFService.findOne({
    _id: serviceId,
    isActivated: true
  });

  if (!service) {
    throw { status: httpStatus.BAD_REQUEST, message: 'No service found with this serviceId !!' };
  }

  if (!service.isActivated) {
    throw { status: httpStatus.BAD_REQUEST, message: `This service named ${service.serviceName} is not activated as of now, please try again later !! ` };
  }

  return service;
};

module.exports = {
  CreateService,
  getActiveMFServiceById
};
