const express = require('express');
const router = express.Router();

const customerRoutes = require('../../../../src/modules/user/customer/interfaces/http/customerRoutes');

router.use('/customers', customerRoutes);

router.get('/', (req, res) => {
  res.json({ پیام: '✅ API با موفقیت در حال اجراست' });
});

module.exports = router;
