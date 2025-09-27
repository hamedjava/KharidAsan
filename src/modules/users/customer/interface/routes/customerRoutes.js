import express from 'express';
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  sendOtp,
  loginWithOTP,
  loginWithEmail
} from '../controllers/CustomerController.js';

const router = express.Router();

// CRUD Customer
router.post('/', createCustomer);
router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

// روت‌های Auth
router.post('/send-otp', sendOtp);
router.post('/login-otp', loginWithOTP);
router.post('/login-email', loginWithEmail);

export default router;
