const Customer = require('../../../../user/customer/infrastructure/database/mongoos/customer.model.js');
const CustomerEntity = require('../../domain/entities/customer.entity');

module.exports = {
  async create(data) {
    const entity = new CustomerEntity(data);
    const doc = await Customer.create(entity.toDatabaseObject());
    return CustomerEntity.fromDatabase(doc);
  },

  async findByMobile(mobile) {
    const normalized = String(mobile).trim();
    const doc = await Customer.findOne({ mobile: normalized, role: { $regex: /^customer$/i } });
    return CustomerEntity.fromDatabase(doc);
  },

  async findByEmail(email) {
    const normalized = String(email).trim().toLowerCase();
    const doc = await Customer.findOne({ email: normalized, role: { $regex: /^customer$/i } });
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
