const jwt = require('jsonwebtoken');

module.exports = function customerAuth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

    const token = authHeader.replace(/Bearer\s+/i, '').trim();
    if (!token) return res.status(401).json({ error: 'JWT token missing after Bearer keyword' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'customer') return res.status(403).json({ error: 'Forbidden: Not a customer token' });

    req.customer = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token', details: err.message });
  }
};
