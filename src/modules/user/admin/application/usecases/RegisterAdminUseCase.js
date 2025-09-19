import bcrypt from 'bcrypt';

export class RegisterAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(data) {
    const existingUser = await this.adminRepository.findByMobile(data.mobile);
    if (existingUser) {
      throw new Error('Mobile already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    return await this.adminRepository.create({
      ...data,
      passwordHash
    });
  }
}
