// core/auth/interfaces/middlewares/role.middleware.js
module.exports = function roleMiddleware(allowedRoles = []) {
  return function (req, res, next) {
    try {
      if (!req.user || !req.role) {
        return res.status(403).json({
          status: 'error',
          message: 'User not authenticated or missing role',
        });
      }

      const userRole = String(req.role).trim().toLowerCase();
      const normalizedAllowed = allowedRoles.map(r => String(r).trim().toLowerCase());

      // ✅ این بخش به صورت عمومی همه نقش‌ها از جمله customer را پشتیبانی می‌کند.
      if (!normalizedAllowed.includes(userRole)) {
        return res.status(403).json({
          status: 'error',
          message: `Access denied. Your role: ${userRole} → Allowed: ${normalizedAllowed.join(', ')}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error in Role Middleware',
        error: error.message,
      });
    }
  };
};
