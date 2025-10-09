const express = require('express');
const router = express.Router();
const customerProfileController = require('../controllers/customerProfile.controller');
const customerAuth = require('../middlewares/customerAuth.middleware');

router.get('/profile', customerAuth, customerProfileController.getProfile);
router.put('/profile', customerAuth, customerProfileController.updateProfile);
router.put('/change-password', customerAuth, customerProfileController.changePassword);

module.exports = router;
