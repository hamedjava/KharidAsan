const mongoose = require('mongoose');
const AuthService = require('../../application/services/auth.service.js');

const AdminModel = require('../../../../modules/user/admin/infrastructure/database/mongoose/admin.model.js');
const SellerModel = require('../../../../modules/user/seller/infrastructure/mongoose/seller.model.js');

// ✅ اصلاح مسیر CustomerModel (تایپ mongoos → mongoose)
const CustomerModel = require('../../../../modules/user/customer/infrastructure/database/mongoos/customer.model.js');

module.exports = async function authMiddleware(req, res, next) {
  try {
    const rawHeader = req.headers.authorization || '';
    const authHeader = String(rawHeader).replace(/\s+/g, ' ').trim();

    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Missing or invalid Authorization header (expected: Bearer <token>)',
      });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'JWT token missing' });
    }

    const payload = AuthService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }

    const userId = payload.id || payload.userId;
    const role = String(payload.role || '').toLowerCase();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: 'error', message: 'Invalid userId in token' });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    let UserModel;
    switch (role) {
      case 'admin':
        UserModel = AdminModel;
        break;
      case 'seller':
        UserModel = SellerModel;
        break;

      // ✅ قسمت مربوط به Customer (اصلاح‌شده)
      case 'customer':
        UserModel = CustomerModel;
        break;

      default:
        return res.status(403).json({ status: 'error', message: `Unknown role: ${role}` });
    }

    const user = await UserModel.findById(objectId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found in DB' });
    }

    req.user = user;
    req.userId = user._id.toString();
    req.role = role;

    next();
  } catch (err) {
    console.error('💥 Auth Middleware Error:', err.stack);
    res.status(500).json({ status: 'error', message: `Server error: ${err.message}` });
  }
};
