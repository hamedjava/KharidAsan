/**
 * فایل app.js - تنظیمات و مسیرهای اصلی
 */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// ایجاد نمونه اپ
const app = express();

// ---------- Middleware عمومی ----------
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- مسیر پیش‌فرض (Home) ----------
app.get('/', (req, res) => {
  res.json({ message: 'به فروشگاه اینترنتی خوش آمدید!' });
});

// ---------- وارد کردن روت‌های ماژول‌ها ----------
import productRoutes from './modules/product/interface/routes/productRoutes.js';
// اگر سایر ماژول‌ها هم آماده هستند، اینجا اضافه کنید
// import customerRoutes from './modules/user/interface/customerRoutes.js';
// import adminRoutes from './modules/admin/interface/adminRoutes.js';

app.use('/api/products', productRoutes);
// app.use('/api/customers', customerRoutes);
// app.use('/api/admins', adminRoutes);

// ---------- هندلینگ مسیرهای ناشناخته ----------
app.use((req, res) => {
  res.status(404).json({ error: 'مسیر یافت نشد' });
});

// ---------- هندلینگ خطاهای داخلی سرور ----------
app.use((err, req, res, next) => {
  console.error('🔥 خطای داخلی سرور:', err.stack);
  res.status(500).json({ error: 'خطای داخلی سرور' });
});

export default app;
