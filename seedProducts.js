/**
 * seedProducts.js
 * این فایل ۱۰۰ محصول تستی با دسته‌بندی‌های مختلف را داخل دیتابیس GreenShop ذخیره می‌کند.
 */
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from './src/modules/product/infrastructure/models/ProductModel.js';

// آدرس اتصال به MongoDB (از فایل .env بخوان یا تنظیم پیش‌فرض با اسم دیتابیس GreenShop)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/GreenShop';

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ اتصال به پایگاه داده GreenShop برقرار شد.');
    } catch (err) {
        console.error('❌ خطا در اتصال به پایگاه داده:', err.message);
        process.exit(1);
    }
}

async function seedProducts() {
    // دسته‌بندی‌های نمونه
    const categories = [
        'لباس زیر زنانه',
        'لباس زیر مردانه',
        'ست فانتزی',
        'خانگی راحت',
        'اسپرت',
        'مناسبتی',
        'بچه‌گانه'
    ];

    const products = [];

    for (let i = 1; i <= 100; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        products.push({
            name: `محصول شماره ${i}`,
            description: `توضیحات محصول شماره ${i} (${category})`,
            price: Math.floor(Math.random() * 500000) + 50000, // قیمت بین 50هزار تا 550هزار
            category,
            stock: Math.floor(Math.random() * 50) + 1 // موجودی بین 1 تا 50
        });
    }

    try {
        await Product.insertMany(products);
        console.log(`🎯 ${products.length} محصول در دیتابیس GreenShop اضافه شد.`);
    } catch (err) {
        console.error('❌ خطا در ذخیره محصولات:', err.message);
    } finally {
        mongoose.connection.close();
        console.log('🔒 اتصال پایگاه داده بسته شد.');
    }
}

// اجرای برنامه
(async () => {
    await connectDB();
    await seedProducts();
})();
