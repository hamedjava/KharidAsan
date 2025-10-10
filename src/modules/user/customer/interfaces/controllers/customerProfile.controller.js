const getCustomerProfile = require('../../domain/usecases/getCustomerProfile.usecase');
const updateCustomerProfile = require('../../domain/usecases/updateCustomerProfile.usecase');
const changeCustomerPassword = require('../../domain/usecases/changeCustomerPassword.usecase');

module.exports = {
  async getProfile(req, res) {
    try {
      const profile = await getCustomerProfile(req.userId);
      if (!profile) return res.status(404).json({ error: 'Customer not found' });

      const { password, otp, ...safeProfile } = profile;
      res.status(200).json({ data: safeProfile });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const updated = await updateCustomerProfile(req.userId, req.body);
      res.status(200).json({ message: 'Profile updated', data: updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await changeCustomerPassword(req.userId, oldPassword, newPassword);
      res.status(200).json({ message: 'Password changed successfully', data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
