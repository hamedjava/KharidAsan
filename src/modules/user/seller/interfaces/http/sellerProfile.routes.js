/**
 * مسیر: seller/interfaces/http/sellerProfile.routes.js
 * وظایف:
 *  - نمایش و بروزرسانی پروفایل فروشنده (JWT Protected)
 */
const express = require('express');
const router = express.Router();
const sellerProfileController = require('../controllers/sellerProfile.controller'); 
const sellerAuthMiddleware = require('../middlewares/sellerAuth.middleware');


// 🛡 مسیر دریافت پروفایل فروشنده
router.get('/profile', sellerAuthMiddleware, sellerProfileController.get);

// 🛠 مسیر بروزرسانی پروفایل فروشنده
router.put('/profile', sellerAuthMiddleware, sellerProfileController.update);

router.put('/change-password', sellerAuthMiddleware, sellerProfileController.changePassword);

module.exports = router;
