import express from 'express';
import { MongoSellerRepository } from '../../infrastructure/database/MongoSellerRepository.js';
import { SellerController } from '../controllers/SellerController.js';

const router = express.Router();

const sellerRepository = new MongoSellerRepository();
const sellerController = new SellerController(sellerRepository);

// ثبت‌ نام فروشنده
router.post('/register', (req, res) => sellerController.register(req, res));

export default router;
