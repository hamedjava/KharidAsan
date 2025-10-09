const customerRepository = require('../../infrastructure/repositories/customer.repository');
const bcrypt = require('bcrypt');

module.exports = async function registerCustomerUseCase({ name, email, mobile, password }) {
  const existingEmail = await customerRepository.findByEmail(email);
  const existingMobile = await customerRepository.findByMobile(mobile);
  if (existingEmail || existingMobile) throw new Error('Customer already exists');

  const hashed = await bcrypt.hash(password, 10);
  return await customerRepository.create({ name, email, mobile, password: hashed });
};
