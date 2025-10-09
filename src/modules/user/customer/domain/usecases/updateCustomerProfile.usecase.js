const customerRepository = require('../../infrastructure/repositories/customer.repository');

module.exports = async function updateCustomerProfileUseCase(id, updates) {
  const updated = await customerRepository.updateById(id, updates);
  if (!updated) throw new Error('Failed to update profile');
  return updated;
};
