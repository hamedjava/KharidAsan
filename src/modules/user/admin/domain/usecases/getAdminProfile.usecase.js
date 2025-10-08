// modules/user/admin/application/usecases/getAdminProfile.usecase.js
module.exports = async function getAdminProfile(adminRepository, adminId) {
    const admin = await adminRepository.findById(adminId);
    if (!admin) {
        throw new Error('ادمین یافت نشد.');
    }
    return admin;
};
