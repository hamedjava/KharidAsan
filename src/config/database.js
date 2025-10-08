const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/KharidAsan';
  await mongoose.connect(uri);
  console.log('✅ اتصال به MongoDB برقرار شد.');

  mongoose.connection.on('error', (err) =>
    console.error('🚨 خطای پایگاه داده:', err.message)
  );
}

module.exports = connectDB;
