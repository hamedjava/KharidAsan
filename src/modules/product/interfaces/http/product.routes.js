const express = require('express');
const router = express.Router();
const productController = require('../../../product/interfaces/controllers/product.controller.js');
const sellerAuth = require('../../../user/seller/interfaces/middlewares/sellerAuth.middleware.js');

// 🔹 اول مسیرهای عمومی را تعریف کن
router.get('/', productController.list);              // لیست همه محصولات
router.get('/:id', productController.getById);        // دریافت محصول بر اساس id

// 🔹 بعد مسیرهای نیازمند احراز هویت Seller
router.post('/', sellerAuth, productController.create);   // ایجاد محصول
router.put('/:id', sellerAuth, productController.update); // بروزرسانی محصول
router.delete('/:id', sellerAuth, productController.delete); // حذف محصول

module.exports = router;
