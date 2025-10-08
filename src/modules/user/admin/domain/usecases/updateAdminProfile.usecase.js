// modules/user/admin/application/usecases/updateAdminProfile.usecase.js
module.exports = async function updateAdminProfile(adminRepository, adminId, updateData) {
    const updatedAdmin = await adminRepository.updateById(adminId, updateData);
    if (!updatedAdmin) {
        throw new Error('پروفایل یافت نشد.');
    }
    return updatedAdmin;
};
