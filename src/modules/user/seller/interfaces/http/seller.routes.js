// seller/interfaces/http/sellerAuth.routes.js
const express = require('express');
const router = express.Router();
const sellerAuthController = require('../controllers/sellerAuth.controller.js');

router.post('/register', sellerAuthController.register);
router.post('/send-otp', sellerAuthController.sendOTP);
router.post('/verify-otp', sellerAuthController.verifyOTP);

module.exports = router;
