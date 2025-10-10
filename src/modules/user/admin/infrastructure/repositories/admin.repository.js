const AdminModel = require('../database/mongoose/admin.model.js');

class AdminRepository {
  async create(data) {
    const admin = new AdminModel(data);
    return admin.save();
  }

  async findByEmail(email) {
    return AdminModel.findOne({ email: String(email).trim() });
  }

  async findByMobile(mobile) {
    const normalized = String(mobile).trim();
    console.log(`📊 findByMobile call → ${normalized}`);
    const admin = await AdminModel.findOne({ mobile: normalized });

    console.log(`📊 findByMobile result → ${admin ? admin.email : '❌ not found'}`);
    return admin;
  }

  async findById(id) {
    return AdminModel.findById(id);
  }

  async updateById(id, data) {
    return AdminModel.findByIdAndUpdate(id, data, { new: true });
  }

  async changePassword(id, hashedPassword) {
    return AdminModel.findByIdAndUpdate(id, { password: hashedPassword });
  }
}

module.exports = new AdminRepository();
