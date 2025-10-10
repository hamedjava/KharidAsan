const adminRepository = require('../../infrastructure/repositories/admin.repository.js');
const getAdminProfile = require('../../domain/usecases/getAdminProfile.usecase.js');
const updateAdminProfile = require('../../domain/usecases/updateAdminProfile.usecase.js');
const changeAdminPassword = require('../../domain/usecases/changeAdminPassword.usecase.js');

module.exports = {
  async getProfile(req, res) {
    try {
      const admin = await getAdminProfile(adminRepository, req.userId); // ✅ اصلاح از req.adminId به req.userId
      res.json({ status: 'success', data: admin });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const updated = await updateAdminProfile(adminRepository, req.userId, req.body);
      res.json({ status: 'success', message: 'پروفایل بروزرسانی شد', data: updated });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await changeAdminPassword(adminRepository, req.userId, oldPassword, newPassword);
      res.json({ status: 'success', message: 'رمز عبور تغییر یافت', data: result });
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  },
};
