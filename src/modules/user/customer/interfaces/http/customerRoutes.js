const express = require('express');
const router = express.Router();

// 📌 مثال ساده برای GET
router.get('/', (req, res) => {
  res.json({ پیام: 'لیست مشتری‌ها' });
});

module.exports = router;
