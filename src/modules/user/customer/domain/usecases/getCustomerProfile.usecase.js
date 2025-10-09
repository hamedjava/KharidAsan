const customerRepository = require('../../infrastructure/repositories/customer.repository');

module.exports = async function getCustomerProfileUseCase(id) {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new Error('Customer not found');
  return customer;
};
