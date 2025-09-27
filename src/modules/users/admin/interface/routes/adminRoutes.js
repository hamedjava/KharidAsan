import express from 'express';
import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  sendOtp,
  loginWithOTP,
  loginWithEmail
} from '../controllers/AdminController.js';

const router = express.Router();

// CRUD Admin
router.post('/', createAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

// روت‌های Auth
router.post('/send-otp', sendOtp);           // ارسال OTP
router.post('/login-otp', loginWithOTP);     // ورود با OTP
router.post('/login-email', loginWithEmail); // ورود با ایمیل و پسورد

export default router;
