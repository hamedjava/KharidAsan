const express = require('express');
const router = express.Router();
const AdminAuthController = require('../controllers/adminAuth.controller');

router.post('/register', AdminAuthController.register);
router.post('/send-otp', AdminAuthController.sendOTP);
router.post('/verify-otp', AdminAuthController.verifyOTP);

module.exports = router;
