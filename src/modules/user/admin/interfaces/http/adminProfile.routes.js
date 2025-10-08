// modules/user/admin/interfaces/http/adminProfile.routes.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth.middleware');
const adminProfileController = require('../controllers/adminProfile.controller');

router.get('/profile', adminAuth, adminProfileController.getProfile);
router.put('/profile', adminAuth, adminProfileController.updateProfile);
router.put('/change-password', adminAuth, adminProfileController.changePassword);

module.exports = router;
