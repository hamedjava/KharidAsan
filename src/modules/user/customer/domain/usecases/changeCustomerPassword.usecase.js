const customerRepository = require('../../infrastructure/repositories/customer.repository');
const bcrypt = require('bcrypt');

module.exports = async function changeCustomerPasswordUseCase(id, oldPassword, newPassword) {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new Error('Customer not found');

  const match = await bcrypt.compare(oldPassword, customer.password);
  if (!match) throw new Error('Incorrect old password');

  const hashed = await bcrypt.hash(newPassword, 10);
  return await customerRepository.updateById(id, { password: hashed });
};
