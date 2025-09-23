import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

// مسیرهای خاص‌تر اول ثبت شوند
router.get('/search', ProductController.search);
router.get('/order-by-price', ProductController.orderByPrice);

// CRUD
router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
