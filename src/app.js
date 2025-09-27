import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import productRoutes from './modules/product/interface/routes/productRoutes.js';
import adminRoutes from './modules/users/admin/interface/routes/adminRoutes.js';  // اصلاح مسیر

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'به فروشگاه اینترنتی خوش آمدید!' });
});

app.use('/api/products', productRoutes);
app.use('/api/admins', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'مسیر یافت نشد' });
});

app.use((err, req, res, next) => {
  console.error('🔥 خطای داخلی سرور:', err.stack);
  res.status(500).json({ error: 'خطای داخلی سرور' });
});

export default app;
