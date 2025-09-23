// مسیر فایل: src/shared/validations/registerValidation.js
// وظیفه: بررسی صحت اطلاعات ثبت‌نام کاربر.

import Joi from 'joi';

const registerValidation = Joi.object({
  fullName: Joi.string().min(3).required(),
  phoneNumber: Joi.string().pattern(/^09\d{9}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('seller', 'admin', 'customer').required(),
  address: Joi.string().allow('', null),
  avatarUrl: Joi.string().uri().allow('', null)
});

export default registerValidation;
