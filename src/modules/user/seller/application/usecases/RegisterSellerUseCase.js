import bcrypt from 'bcrypt';

export class RegisterSellerUseCase {
  constructor(sellerRepository) {
    this.sellerRepository = sellerRepository;
  }

  async execute({
    fullName,
    mobile,
    email,
    password,
    shopName,
    shopDescription,
    shopLogo,
    businessLicenseNumber,
    bankAccount
  }) {
    // چک وجود موبایل قبلاً ثبت شده
    const existingUser = await this.sellerRepository.findByMobile(mobile);
    if (existingUser) throw new Error('Mobile number already registered');

    // هش کردن پسورد در صورت وجود
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    // ایجاد رکورد فروشنده
    return await this.sellerRepository.create({
      fullName,
      mobile,
      email,
      passwordHash,
      role: 'seller',
      shopName,
      shopDescription,
      shopLogo,
      businessLicenseNumber,
      bankAccount,
    });
  }
}
