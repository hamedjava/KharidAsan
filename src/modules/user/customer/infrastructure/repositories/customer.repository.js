const Customer = require('../../../customer/infrastructure/database/mongoos/customer.model.js');
const CustomerEntity = require('../../domain/entities/customer.entity');

module.exports = {
  async create(data) {
    const entity = new CustomerEntity(data);
    const doc = await Customer.create(entity.toDatabaseObject());
    return CustomerEntity.fromDatabase(doc);
  },

  async findByMobile(mobile) {
    const doc = await Customer.findOne({ mobile });
    return CustomerEntity.fromDatabase(doc);
  },

  async findByEmail(email) {
    const doc = await Customer.findOne({ email });
    return CustomerEntity.fromDatabase(doc);
  },

  async findById(id) {
    const doc = await Customer.findById(id);
    return CustomerEntity.fromDatabase(doc);
  },

  async updateById(id, updateData) {
    const doc = await Customer.findByIdAndUpdate(id, updateData, { new: true });
    return CustomerEntity.fromDatabase(doc);
  }
};
