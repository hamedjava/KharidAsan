const getCustomerProfile = require('../../domain/usecases/getCustomerProfile.usecase');
const updateCustomerProfile = require('../../domain/usecases/updateCustomerProfile.usecase');
const changeCustomerPassword = require('../../domain/usecases/changeCustomerPassword.usecase');

module.exports = {
  // ------------------------- GET PROFILE -------------------------
  async getProfile(req, res) {
    try {
      const profile = await getCustomerProfile(req.customer.id);

      if (!profile) {
        return res.status(404).json({
          status: 'error',
          message: 'Customer not found',
        });
      }

      // حذف داده‌های حساس قبل از پاسخ
      const { password, otp, ...safeProfile } = profile;

      res.status(200).json({
        status: 'success',
        data: safeProfile,
      });
    } catch (err) {
      console.error('❌ Error in getProfile:', err);
      res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error',
      });
    }
  },

  // ------------------------- UPDATE PROFILE -------------------------
  async updateProfile(req, res) {
    try {
      const updated = await updateCustomerProfile(req.customer.id, req.body);

      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: 'Profile not found or update failed',
        });
      }

      const { password, otp, ...safeData } = updated;

      res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: safeData,
      });
    } catch (err) {
      console.error('❌ Error in updateProfile:', err);
      res.status(400).json({
        status: 'error',
        message: err.message || 'Failed to update profile',
      });
    }
  },

  // ------------------------- CHANGE PASSWORD -------------------------
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Old and new passwords are required',
        });
      }

      const result = await changeCustomerPassword(req.customer.id, oldPassword, newPassword);

      res.status(200).json({
        status: 'success',
        message: 'Password changed successfully',
        data: result,
      });
    } catch (err) {
      console.error('❌ Error in changePassword:', err);
      const statusCode = err.message === 'Invalid old password' ? 401 : 400;
      res.status(statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
  },
};
