import express from 'express';
import { MongoCustomerRepository } from '../../../../../modules/user/customer/infrastructure/database/MongoCustomerRepository.js';
import { MongoSellerRepository } from '../../../../../modules/user/seller/infrastructure/database/MongoSellerRepository.js';
import { MongoAdminRepository } from '../../../../../modules/user/admin/infrastructure/database/MongoAdminRepository.js';

import { LoginWithOTPUseCase } from '../../application/usecases/LoginWithOTPUseCase.js';
import { VerifyOTPUseCase } from '../../application/usecases/VerifyOTPUseCase.js';

const router = express.Router();

// برای ساده‌سازی، نقش رو از query می‌گیریم: ?role=customer/seller/admin
const repositories = {
  customer: new MongoCustomerRepository(),
  seller: new MongoSellerRepository(),
  admin: new MongoAdminRepository(),
};

// درخواست کد OTP
router.post('/otp-login', async (req, res) => {
  const { mobile, role } = req.body;
  const repo = repositories[role];
  if (!repo) return res.status(400).json({ message: 'Invalid role' });

  try {
    const useCase = new LoginWithOTPUseCase(repo);
    const result = await useCase.execute(mobile);
    res.json({ message: 'OTP sent', otp: result.otpCode });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// تایید OTP
router.post('/verify-otp', async (req, res) => {
  const { mobile, otpCode, role } = req.body;
  const repo = repositories[role];
  if (!repo) return res.status(400).json({ message: 'Invalid role' });

  try {
    const useCase = new VerifyOTPUseCase(repo);
    const result = await useCase.execute({ mobile, otpCode });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
