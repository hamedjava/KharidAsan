export default class ProductRepository {
  async create(productEntity) {
    throw new Error('متد create باید پیاده‌سازی شود');
  }

  async findAll() {
    throw new Error('متد findAll باید پیاده‌سازی شود');
  }

  async find(query, sortQuery, skip, limit) {
    throw new Error('متد find باید پیاده‌سازی شود');
  }

  async count(query) {
    throw new Error('متد count باید پیاده‌سازی شود');
  }

  async findById(id) {
    throw new Error('متد findById باید پیاده‌سازی شود');
  }

  async update(id, updateData) {
    throw new Error('متد update باید پیاده‌سازی شود');
  }

  async delete(id) {
    throw new Error('متد delete باید پیاده‌سازی شود');
  }
}
