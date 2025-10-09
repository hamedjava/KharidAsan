/**
 * مسیر: seller/interfaces/controllers/sellerProfile.controller.js
 * وظایف:
 *  - دریافت پروفایل فروشنده
 *  - بروزرسانی پروفایل
 *  - تغییر رمز عبور
 */

const getSellerProfile = require('../../domain/usecases/getSellerProfile.usecase');
const updateSellerProfile = require('../../domain/usecases/updateSellerProfile.usecase');
const changeSellerPassword = require('../../domain/usecases/changeSellerPassword.usecase');

module.exports = {
  /**
   * دریافت پروفایل فروشنده
   */
  async get(req, res) {
    try {
      const seller = await getSellerProfile(req.seller.id);

      if (!seller) {
        return res.status(404).json({ error: 'Seller profile not found' });
      }

      // حذف فیلدهای حساس قبل از ارسال
      const { password, ...safeSellerData } = seller.toObject ? seller.toObject() : seller;
      res.status(200).json(safeSellerData);

    } catch (err) {
      console.error('❌ Error fetching seller profile:', err.message);
      res.status(500).json({ error: 'Server error while fetching profile' });
    }
  },

  /**
   * بروزرسانی پروفایل فروشنده
   */
  async update(req, res) {
    try {
      const updatedSeller = await updateSellerProfile(req.seller.id, req.body);

      if (!updatedSeller) {
        return res.status(404).json({ error: 'Seller profile not found for update' });
      }

      const { password, ...safeUpdatedData } = updatedSeller.toObject ? updatedSeller.toObject() : updatedSeller;
      res.status(200).json({
        message: 'Profile updated successfully',
        seller: safeUpdatedData
      });

    } catch (err) {
      console.error('❌ Error updating seller profile:', err.message);
      const status = err.status || 500;
      res.status(status).json({ error: err.message || 'Server error while updating profile' });
    }
  },

  /**
   * تغییر رمز عبور فروشنده
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = req.body;
      const result = await changeSellerPassword(req.seller.id, currentPassword, newPassword, confirmNewPassword);

      res.status(200).json({
        message: 'Password changed successfully',
        seller: result
      });

    } catch (err) {
      console.error('❌ Error changing seller password:', err.message);
      const status = err.status || 500;
      res.status(status).json({ error: err.message || 'Server error while changing password' });
    }
  }
};
