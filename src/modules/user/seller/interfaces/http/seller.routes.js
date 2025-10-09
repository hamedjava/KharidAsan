/**
 * مسیر: seller/interfaces/http/seller.routes.js
 * وظایف:
 *  - مسیرهای ثبت‌نام فروشنده، ارسال و تایید OTP
 */
const express = require('express');
const router = express.Router();
const sellerAuthController = require('../controllers/sellerAuth.controller');

router.post('/register', sellerAuthController.register);
router.post('/send-otp', sellerAuthController.sendOTP);
router.post('/verify-otp', sellerAuthController.verifyOTP);

module.exports = router;
