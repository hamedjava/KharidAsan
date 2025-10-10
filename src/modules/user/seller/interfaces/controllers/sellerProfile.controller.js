// seller/interfaces/controllers/sellerProfile.controller.js
const sellerRepository = require('../../infrastructure/repositories/seller.repository.js');
const changePasswordUseCase = require('../../domain/usecases/changeSellerPassword.usecase.js');

module.exports = {
  async get(req, res) {
    try {
      const seller = await sellerRepository.findById(req.userId);
      if (!seller) return res.status(404).json({ error: 'Seller not found' });
      const { password, otp, ...data } = seller.toObject();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await sellerRepository.updateById(req.userId, req.body);
      res.status(200).json({ message: 'Profile updated successfully', seller: updated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const result = await changePasswordUseCase(req.userId, currentPassword, newPassword);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
