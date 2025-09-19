import { UserRepository } from '../../../../../../src/modules/user/shared/domain/repositories/UserRepository.js';
import { CustomerModel } from './models/CustomerModel.js';

export class MongoCustomerRepository extends UserRepository {
  async create(userData) {
    return await CustomerModel.create(userData);
  }

  async findById(id) {
    return await CustomerModel.findById(id);
  }

  async findByMobile(mobile) {
    return await CustomerModel.findOne({ mobile });
  }

  async findByEmail(email) {
    return await CustomerModel.findOne({ email });
  }

  async update(id, updateData) {
    return await CustomerModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await CustomerModel.findByIdAndDelete(id);
  }
}
