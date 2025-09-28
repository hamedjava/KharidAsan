import express from 'express';
import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  sendOtp,
  loginWithOTP,
  loginWithEmail,
  getSecureData // 🎯 کنترلر مسیر امن
} from '../controllers/AdminController.js';

// 🛡 Middlewareهای احراز هویت و نقش
import { authenticateAdmin } from '../../../../../common/middlewares/authenticateAdmin.js';
import { checkRole } from '../../../../../common/middlewares/checkRole.js';

const router = express.Router();

/* ========================
   مسیر امن (فقط سوپرادمین)
   باید قبل از /:id تعریف شود
======================== */
router.get(
  '/secure-data',
  authenticateAdmin,            // ابتدا احراز هویت بر اساس توکن
  checkRole(['super_admin']),   // سپس بررسی نقش
  getSecureData                  // کنترلر برگرداندن داده امن
);

/* ========================
   CRUD Admin
======================== */
router.post('/', createAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

/* ========================
   Auth Routes
======================== */
router.post('/send-otp', sendOtp);           // ارسال OTP
router.post('/login-otp', loginWithOTP);     // ورود با OTP
router.post('/login-email', loginWithEmail); // ورود با ایمیل و پسورد

export default router;
