import { UserRepository } from '../../../../../../src/modules/user/shared/domain/repositories/UserRepository.js';
import { AdminModel } from './models/AdminModel.js';

export class MongoAdminRepository extends UserRepository {
  async create(userData) {
    return await AdminModel.create(userData);
  }

  async findById(id) {
    return await AdminModel.findById(id);
  }

  async findByMobile(mobile) {
    return await AdminModel.findOne({ mobile });
  }

  async findByEmail(email) {
    return await AdminModel.findOne({ email });
  }

  async update(id, updateData) {
    return await AdminModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await AdminModel.findByIdAndDelete(id);
  }
}
