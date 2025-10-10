/**
 * مسیر: src/modules/product/interfaces/routes/product.routes.js
 * وظایف:
 *  - مسیرهای CRUD محصول
 *  - استفاده از Auth مرکزی برای نقش فروشنده (Seller)
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// ✅ Auth مرکزی
const authMiddleware = require('../../../../core/auth/interfaces/middlewares/auth.middleware');
const roleMiddleware = require('../../../../core/auth/interfaces/middlewares/role.middleware');

// 🔹 مسیرهای عمومی (بدون نیاز به احراز هویت)
router.get('/', productController.list);              // لیست همه محصولات
router.get('/:id', productController.getById);        // دریافت محصول بر اساس id

// 🔹 مسیرهای نیازمند احراز هویت و نقش Seller
router.post('/', authMiddleware, roleMiddleware(['seller']), productController.create);
router.put('/:id', authMiddleware, roleMiddleware(['seller']), productController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['seller']), productController.delete);

module.exports = router;
