const express = require('express');
const router = express.Router();

const customerRoutes = require('../../modules/user/customer/interfaces/http/customerRoutes');
router.use('/customers', customerRoutes);

router.get('/', (req, res) => res.json({ message: '✅ API فعال است' }));

module.exports = router;
