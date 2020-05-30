const express = require('express');
const mfServicesController = require('../../controllers/mfServices.controller');

const router = express.Router();


router.post('/createMFService', mfServicesController.createMFService);

module.exports = router;