const mongoose = require('mongoose');

/**
 * 🧩 اتصال به پایگاه داده MongoDB
 */
async function connectDB() {
  try {
    const mongoURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/cleanarch-shop';
    await mongoose.connect(mongoURI);
    console.log('✅ اتصال موفق به MongoDB');

    mongoose.connection.on('connected', () => {
      console.log('📡 اتصال به MongoDB برقرار شد');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🚨 خطا در MongoDB:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ اتصال به MongoDB قطع شد');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 اتصال به MongoDB به‌دلیل توقف برنامه بسته شد');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ خطا در اتصال به MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
