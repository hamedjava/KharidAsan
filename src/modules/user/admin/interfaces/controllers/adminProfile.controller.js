// modules/user/admin/interfaces/controllers/adminProfile.controller.js
const adminRepository = require('../../infrastructure/repositories/admin.repository');
const getAdminProfile = require('./../../domain/usecases/getAdminProfile.usecase.js');
const updateAdminProfile = require('./../../domain/usecases/updateAdminProfile.usecase');
const changeAdminPassword = require('./../../domain/usecases/changeAdminPassword.usecase');

module.exports = {
    async getProfile(req, res) {
        try {
            const admin = await getAdminProfile(adminRepository, req.adminId);
            res.json(admin);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async updateProfile(req, res) {
        try {
            const updatedAdmin = await updateAdminProfile(adminRepository, req.adminId, req.body);
            res.json({ message: 'پروفایل با موفقیت بروزرسانی شد', data: updatedAdmin });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const result = await changeAdminPassword(adminRepository, req.adminId, oldPassword, newPassword);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
