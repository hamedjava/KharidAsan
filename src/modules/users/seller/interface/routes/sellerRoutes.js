// مسیر فایل: seller/interface/routes/sellerRoutes.js
// شرح وظایف: این فایل مسیرهای HTTP مربوط به فروشنده‌ها را تعریف می‌کند.
// شامل مسیرهای CRUD و مسیرهای احراز هویت (ارسال OTP، ورود با OTP و ورود با ایمیل) است.

import express from 'express';
import {
  createSeller,
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
  sendOtp,
  loginWithOTP,
  loginWithEmail
} from '../controllers/SellerController.js';

const router = express.Router();

router.post('/', createSeller);
router.get('/', getSellers);
router.get('/:id', getSellerById);
router.put('/:id', updateSeller);
router.delete('/:id', deleteSeller);
router.post('/send-otp', sendOtp);
router.post('/login-otp', loginWithOTP);
router.post('/login-email', loginWithEmail);

export default router;
