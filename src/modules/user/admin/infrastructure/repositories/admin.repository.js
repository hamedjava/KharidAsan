const AdminModel = require('../../../admin/infrastructure/database/mongoose/admin.model.js');

class AdminRepository {
    async create(adminData) {
        const admin = new AdminModel(adminData);
        return await admin.save();
    }

    async findByEmail(email) {
        return await AdminModel.findOne({ email });
    }

    async findByMobile(mobile) {
        return await AdminModel.findOne({ mobile });
    }

    async findById(id) {
        return await AdminModel.findById(id);
    }

    async updateById(id, updateData) {
        return await AdminModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async changePassword(id, hashedPassword) {
        return await AdminModel.findByIdAndUpdate(id, { password: hashedPassword });
    }
}

module.exports = new AdminRepository();
