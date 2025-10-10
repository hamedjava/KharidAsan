/**
 * مسیر فایل: src/core/auth/application/utils/jwt.utils.js
 * وظایف:
 *  - ابزارهای کمکی ساخت و بررسی JWT
 *  - پشتیبانی از تنظیم مدت اعتبار توکن
 *  - مورد استفاده در AuthService و Middlewareها
 */

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_key';

const jwtUtils = {
  /**
   * ساخت JWT Token
   * @param {Object} payload
   * @param {string} expiresIn مدت اعتبار توکن (پیش‌فرض 7 روز)
   */
  sign: (payload, expiresIn = '7d') => jwt.sign(payload, JWT_SECRET, { expiresIn }),

  /**
   * بررسی صحت JWT Token
   * @param {string} token
   * @returns {Object|null} payload معتبر یا null
   */
  verify: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  },
};

module.exports = jwtUtils;
