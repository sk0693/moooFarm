const httpStatus = require('http-status');
const { MfServices } = require('../services');
const logger = require('../config/logger');


const createMFService = async (req, res) => {
    try {
        const { serviceName, price } = req.body;
        if (!serviceName || !price || price <= 0) {
            throw {
                status: httpStatus.NOT_ACCEPTABLE, message: "All fields are required !!"
            }
        }
        let service = await MfServices.CreateService(req.body);
        return res.status(httpStatus.CREATED).send(service);
    } catch (error) {
        console.log("createMFService..........error", error)
        return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

module.exports = {
    createMFService
};
