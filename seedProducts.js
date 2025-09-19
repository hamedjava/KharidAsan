// مسیر: seedProducts.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from './src/modules/product/infrastructure/repositories/mongoose/models/ProductModel.js';

dotenv.config();

// 📦 داده‌های نمونه فارسی
const productNames = [
  'کرم مرطوب‌کننده دست و صورت',
  'شامپوی ضدشوره',
  'روغن آرگان مو',
  'پنکیک مات',
  'رژ لب مخملی',
  'سرم ویتامین C',
  'ماسک مو کراتینه',
  'تونر پاک‌کننده پوست',
  'عطر زنانه گل‌بهار',
  'ریمل حجم‌دهنده'
];

const categories = [
  'مراقبت پوست',
  'مراقبت مو',
  'آرایشی',
  'عطر و ادکلن',
  'بهداشت شخصی'
];

const brands = [
  'مای',
  'سی گل',
  'هایلند',
  'Cinere',
  'Nivea',
  'Loreal',
  'Dove'
];

const colors = [
  'قرمز',
  'صورتی',
  'مشکی',
  'طلایی',
  'برنزی',
  'نقره‌ای'
];

const images = [
  'https://example.com/img/product1.jpg',
  'https://example.com/img/product2.jpg',
  'https://example.com/img/product3.jpg'
];

// ⛓ اتصال به دیتابیس
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ اتصال به دیتابیس موفقیت‌آمیز بود، شروع درج اطلاعات تستی...');
  } catch (error) {
    console.error('❌ خطا در اتصال به دیتابیس:', error);
    process.exit(1);
  }
};

// 🎲 ساخت محصول تصادفی + بدون هیچ فیلد خالی
const createRandomProduct = () => {
  const price = Math.floor(Math.random() * (1500000 - 50000) + 50000);
  const discount = Math.floor(Math.random() * 31);
  const finalPrice = price - Math.floor((price * discount) / 100);

  return {
    name: productNames[Math.floor(Math.random() * productNames.length)],
    description: 'این محصول با کیفیت بالا، مواد اولیه درجه‌یک و مناسب استفاده روزانه بوده و باعث بهبود سلامت و زیبایی شما می‌شود.',
    price,
    discount,
    finalPrice,
    brand: brands[Math.floor(Math.random() * brands.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: ['داخلی', 'پرفروش', 'محبوب'],
    images: [images[Math.floor(Math.random() * images.length)]],
    variants: [
      { type: 'رنگ', value: colors[Math.floor(Math.random() * colors.length)] },
      { type: 'سایز', value: `${[50, 100, 200, 400][Math.floor(Math.random() * 4)]}ml` }
    ],
    stock: Math.floor(Math.random() * 200) + 1 // حداقل ۱ تا حداکثر ۲۰۰
  };
};

// 🚀 اجرای Seeder
const seedProducts = async () => {
  await connectDB();
  try {
    await ProductModel.deleteMany();
    console.log('🗑 محصولات قدیمی پاک شدند.');

    const products = Array.from({ length: 50 }, createRandomProduct);
    await ProductModel.insertMany(products);

    console.log(`🎉 ${products.length} محصول فارسی کامل با موفقیت اضافه شد!`);
  } catch (error) {
    console.error('❌ خطا در درج محصولات:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 اتصال به دیتابیس بسته شد.');
  }
};

seedProducts();
