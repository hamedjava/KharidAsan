// مسیر فایل: src/modules/product/domain/ProductEntity.js
// وظایف: تعریف کلاس انتزاعی موجودیت محصول برای انتقال داده بین لایه‌های مختلف.
// این کلاس مستقل از دیتابیس و فریم‌ورک‌هاست.

export default class ProductEntity {
  constructor({ id, name, description, price, category, stock, images, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.images = images;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
