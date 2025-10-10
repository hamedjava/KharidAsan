const express = require('express');
const router = express.Router();
const adminProfileController = require('../controllers/adminProfile.controller.js');
const authMiddleware = require('../../../../../core/auth/interfaces/middlewares/auth.middleware.js');
const roleMiddleware = require('../../../../../core/auth/interfaces/middlewares/role.middleware.js');

router.get('/profile', authMiddleware, roleMiddleware(['admin']), adminProfileController.getProfile);
router.put('/profile', authMiddleware, roleMiddleware(['admin']), adminProfileController.updateProfile);
router.put('/change-password', authMiddleware, roleMiddleware(['admin']), adminProfileController.changePassword);

module.exports = router;
