// seller/infrastructure/repositories/seller.repository.js
const SellerModel = require('../../../seller/infrastructure/mongoose/seller.model.js');

class SellerRepository {
  async create(data) {
    const seller = new SellerModel({ ...data, role: 'seller' });
    return seller.save();
  }

  async findByMobile(mobile) {
    const normalized = String(mobile).trim();
    console.log(`📊 SellerRepository.findByMobile → ${normalized}`);
    const seller = await SellerModel.findOne({
      mobile: normalized,
      role: { $regex: /^seller$/i },
    });
    console.log(`📊 SellerRepository.findByMobile result → ${seller ? seller.email : '❌ not found'}`);
    return seller;
  }

  async findById(id) {
    return SellerModel.findById(id);
  }

  async updateById(id, data) {
    return SellerModel.findByIdAndUpdate(id, data, { new: true });
  }

  async setOTP(mobile, otp) {
    const normalized = String(mobile).trim();
    return SellerModel.findOneAndUpdate(
      { mobile: normalized, role: { $regex: /^seller$/i } },
      { otp },
      { new: true }
    );
  }

  async clearOTP(mobile) {
    const normalized = String(mobile).trim();
    return SellerModel.findOneAndUpdate(
      { mobile: normalized, role: { $regex: /^seller$/i } },
      { otp: null },
      { new: true }
    );
  }
}

module.exports = new SellerRepository();
