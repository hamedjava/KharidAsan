import bcrypt from 'bcrypt';

export class RegisterCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(data) {
    const existingUser = await this.customerRepository.findByMobile(data.mobile);
    if (existingUser) {
      throw new Error('Mobile already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    return await this.customerRepository.create({
      ...data,
      passwordHash
    });
  }
}
