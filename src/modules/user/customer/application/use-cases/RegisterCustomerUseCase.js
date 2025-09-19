import bcrypt from 'bcrypt';

export class RegisterCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ fullName, mobile, email, password }) {
    const existingUser = await this.customerRepository.findByMobile(mobile);
    if (existingUser) throw new Error('Mobile number already registered');

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    return await this.customerRepository.create({
      fullName,
      mobile,
      email,
      passwordHash,
      role: 'customer',
    });
  }
}
