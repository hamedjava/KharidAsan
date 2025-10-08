// modules/user/admin/application/usecases/changeAdminPassword.usecase.js
const bcrypt = require('bcryptjs');

module.exports = async function changeAdminPassword(adminRepository, adminId, oldPassword, newPassword) {
    const admin = await adminRepository.findById(adminId);
    if (!admin) {
        throw new Error('ادمین یافت نشد.');
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
        throw new Error('رمز عبور فعلی نادرست است.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await adminRepository.changePassword(adminId, hashedPassword);

    return { message: 'رمز عبور با موفقیت تغییر یافت.' };
};
