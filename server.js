require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ سرور با موفقیت روی پورت ${PORT} اجرا شد.`));
  } catch (err) {
    console.error('❌ خطا در اتصال به دیتابیس:', err.message);
    process.exit(1);
  }
})();
