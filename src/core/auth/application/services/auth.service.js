const jwt = require('jsonwebtoken');

class AuthService {
  static verifyToken(token) {
    try {
      if (!token) return null;
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
      return decoded;
    } catch (error) {
      console.error('AuthService.verifyToken error:', error.message);
      return null;
    }
  }

  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'mysecretkey', { expiresIn: '1d' });
  }
}

module.exports = AuthService;
