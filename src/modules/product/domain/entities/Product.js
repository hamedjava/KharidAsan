// مسیر فایل: src/modules/product/domain/entities/Product.js

// توضیح: موجودیت محصول در لایه Domain — بدون وابستگی به دیتابیس
export default class Product {
    constructor({
      id,
      name,
      description,
      price,
      discount = 0,
      finalPrice,
      category,
      brand,
      tags = [],
      images = [],
      variants = {},
      stock,
      createdAt,
      updatedAt,
    }) {
      this.id = id;                       // شناسه یکتا محصول
      this.name = name;                   // نام محصول
      this.description = description;     // توضیحات محصول
      this.price = price;                 // قیمت اصلی
      this.discount = discount;           // درصد تخفیف (بین 0 تا 100)
      this.finalPrice = finalPrice;       // قیمت بعد از اعمال تخفیف (اختیاری، می‌توان در UseCase محاسبه کرد)
      this.category = category;           // دسته‌بندی اصلی
      this.brand = brand;                 // برند محصول
      this.tags = tags;                   // لیست برچسب‌ها برای جستجو و فیلتر
      this.images = images;               // آرایه لینک عکس‌ها
      this.variants = variants;           // ویژگی‌های متنوع (مثل رنگ، سایز، حجم و ...)
      this.stock = stock;                 // موجودی
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  