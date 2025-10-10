const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuth.controller.js');

router.post('/register', adminAuthController.register);
router.post('/send-otp', adminAuthController.sendOTP);
router.post('/verify-otp', adminAuthController.verifyOTP);

module.exports = router;
