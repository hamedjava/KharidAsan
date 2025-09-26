/**
 * ایجاد ساختار ماژولار پروژه طبق Clean Architecture و تفکیک نقش‌ها
 * سازگار با ESM و مسیرهای ویندوز/لینوکس
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, 'src');

const structure = {
  config: [],
  database: [],
  docs: [],
  modules: {
    order: {
      domain: [],
      application: [],
      infrastructure: [],
      interface: [],
    },
    product: {
      domain: [],
      application: [],
      infrastructure: [],
      interface: [],
    },
    users: {
      admin: {
        domain: [],
        application: [],
        infrastructure: [],
        interface: [],
      },
      customer: {
        domain: [],
        application: [],
        infrastructure: [],
        interface: [],
      },
      seller: {
        domain: [],
        application: [],
        infrastructure: [],
        interface: [],
      }
    }
  },
  shared: {
    services: [],
    utils: [],
    middleware: [],
    constants: [],
  },
  tests: {
    order: [],
    product: [],
    users: [],
  }
};

function createFolders(basePath, obj) {
  if (Array.isArray(obj)) {
    for (const folder of obj) {
      const folderPath = path.join(basePath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('📁 ایجاد پوشه:', folderPath);
      }
    }
  } else {
    for (const key of Object.keys(obj)) {
      const folderPath = path.join(basePath, key);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('📁 ایجاد پوشه:', folderPath);
      }
      createFolders(folderPath, obj[key]);
    }
  }
}

function createFileIfNotExist(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    console.log('📝 ایجاد فایل:', filePath);
  }
}

async function main() {
  createFolders(ROOT, structure);

  createFileIfNotExist(path.join(__dirname, '.env'), 
`PORT=3000
MONGODB_URI=mongodb://localhost:27017/my-store-db
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
`);

  createFileIfNotExist(path.join(__dirname, 'server.js'),
`import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/database/mongoose.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('⏳ در حال اتصال به دیتابیس...');
    await connectDB();
    console.log('✅ اتصال به دیتابیس برقرار شد.');

    app.listen(PORT, () => {
      console.log(\`🚀 سرور روی پورت \${PORT} اجرا شد\`);
    });
  } catch (error) {
    console.error('❌ خطا در راه‌اندازی سرور:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', reason => console.error('Unhandled Rejection:', reason));
process.on('uncaughtException', error => console.error('Uncaught Exception:', error));

startServer();
`);

  createFileIfNotExist(path.join(ROOT, 'app.js'),
`import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get('/', (req, res) => {
  res.json({ message: 'به فروشگاه اینترنتی خوش آمدید!' });
});

// مثال اضافه کردن روت‌ها:
// import customerRoutes from './modules/users/customer/interface/routes.js';
// app.use('/api/customers', customerRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'مسیر یافت نشد' });
});

export default app;
`);

  createFileIfNotExist(path.join(__dirname, 'README.md'),
`# فروشگاه اینترنتی لباس زیر - ساختار ماژولار
این پروژه با معماری Clean Architecture و تفکیک کامل نقش‌ها طراحی شده است.

## ماژول‌ها:
- users/admin
- users/customer
- users/seller
- product
- order

## راه‌اندازی
\`\`\`bash
npm install
node server.js
\`\`\`
`);

  createFileIfNotExist(path.join(__dirname, '.gitignore'),
`node_modules/
.env
logs/
*.log
dist/
`);
}

main();
