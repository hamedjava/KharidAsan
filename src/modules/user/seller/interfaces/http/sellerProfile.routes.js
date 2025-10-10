// seller/interfaces/http/sellerProfile.routes.js
const express = require('express');
const router = express.Router();

const sellerProfileController = require('../controllers/sellerProfile.controller.js');
const authMiddleware = require('../../../../../core/auth/interfaces/middlewares/auth.middleware.js');
const roleMiddleware = require('../../../../../core/auth/interfaces/middlewares/role.middleware.js');

router.get('/profile', authMiddleware, roleMiddleware(['seller']), sellerProfileController.get);
router.put('/profile', authMiddleware, roleMiddleware(['seller']), sellerProfileController.update);
router.put('/change-password', authMiddleware, roleMiddleware(['seller']), sellerProfileController.changePassword);

module.exports = router;
