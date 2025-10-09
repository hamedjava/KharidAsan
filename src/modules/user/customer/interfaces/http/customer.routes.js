const express = require('express');
const router = express.Router();
const customerAuthController = require('../controllers/customerAuth.controller.js');

router.post('/register', customerAuthController.register);
router.post('/send-otp', customerAuthController.sendOtp);
router.post('/verify-otp', customerAuthController.verifyOtp);

module.exports = router;
