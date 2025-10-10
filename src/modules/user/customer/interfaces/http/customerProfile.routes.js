const express = require('express');
const router = express.Router();
const customerProfileController = require('../controllers/customerProfile.controller');

// ✅ استفاده از Auth مرکزی بدون تغییر در منطق قبلی Admin/Seller
const authMiddleware = require('../../../../../core/auth/interfaces/middlewares/auth.middleware');
const roleMiddleware = require('../../../../../core/auth/interfaces/middlewares/role.middleware');

router.get('/profile', authMiddleware, roleMiddleware(['customer']), customerProfileController.getProfile);
router.put('/profile', authMiddleware, roleMiddleware(['customer']), customerProfileController.updateProfile);
router.put('/change-password', authMiddleware, roleMiddleware(['customer']), customerProfileController.changePassword);

module.exports = router;
