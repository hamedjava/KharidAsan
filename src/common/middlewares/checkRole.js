/**
 * @param {Array<string>} allowedRoles - نقش‌هایی که اجازه دسترسی دارند
 */
export function checkRole(allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'دسترسی غیرمجاز' });
      }
      next();
    };
  }
  