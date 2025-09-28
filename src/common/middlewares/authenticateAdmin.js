import jwt from 'jsonwebtoken';
import Admin from '../../modules/users/admin/infrastructure/models/AdminModel.js';

/**
 * ✅ احراز هویت ادمین با استفاده از JWT
 */
export async function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'توکن ارسال نشده' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'test_secret';
    const decoded = jwt.verify(token, secret);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ error: 'کاربر یافت نشد' });
    }

    req.user = admin; // اضافه کردن کاربر به req
    return next();
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('خطا در authenticateAdmin:', err);
    }
    return res.status(401).json({ error: 'توکن نامعتبر' });
  }
}
