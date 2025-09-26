/**
 * مسیر فایل: src/modules/product/domain/entities/Product.js
 * وظیفه: تعریف Entity اصلی محصول مطابق مفاهیم Domain Layer
 * - این کلاس فقط داده‌ها و قوانین کسب‌وکار محصول را نگه می‌دارد
 */

export default class Product {
    constructor({ id, name, description, price, category, stock, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    updateStock(amount) {
        if (amount < 0) throw new Error('Stock amount cannot be negative.');
        this.stock = amount;
    }
}
