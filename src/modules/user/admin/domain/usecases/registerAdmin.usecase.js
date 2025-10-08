const bcrypt = require('bcryptjs');
const AdminRepository = require('../../infrastructure/repositories/admin.repository');

class RegisterAdminUseCase {
    async execute({ email, password, mobile }) {
        const existingEmail = await AdminRepository.findByEmail(email);
        if (existingEmail) {
            throw new Error('ادمین با این ایمیل قبلاً ثبت شده است.');
        }

        const existingMobile = await AdminRepository.findByMobile(mobile);
        if (existingMobile) {
            throw new Error('ادمین با این شماره موبایل قبلاً ثبت شده است.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await AdminRepository.create({
            email,
            password: hashedPassword,
            mobile
        });

        return admin;
    }
}

module.exports = new RegisterAdminUseCase();
