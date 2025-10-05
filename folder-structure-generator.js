const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * 🚀 اسکریپت آماده‌سازی کامل پروژه Node.js
 * 📦 شامل: ساخت پوشه‌ها، نصب پکیج‌ها، ایجاد فایل‌های اصلی و package.json کامل
 * 📚 طراحی بر اساس معماری Clean Architecture
 */

//------------------------------------
// 📁 مسیرهای اصلی پروژه
//------------------------------------
const baseFolders = [
    "src/config",
    "src/core/errors",
    "src/core/middlewares",
    "src/core/utils",
    "src/interfaces/http/routes",
    "src/tests/unit",
    "src/tests/integration",
];

const modules = [
    "user/admin",
    "user/seller",
    "user/customer",
    "product",
    "payment",
    "order",
    "inventory",
];

const moduleLayers = [
    "domain/entities",
    "domain/usecases",
    "application/services",
    "infrastructure/repositories",
    "interfaces/http",
];

//------------------------------------
// 📂 ساخت پوشه‌ها
//------------------------------------
function createFolders() {
    [...baseFolders].forEach((folder) => {
        fs.mkdirSync(path.join(__dirname, folder), { recursive: true });
    });

    modules.forEach((moduleName) => {
        moduleLayers.forEach((layer) => {
            fs.mkdirSync(
                path.join(__dirname, `src/modules/${moduleName}/${layer}`),
                { recursive: true }
            );
        });
    });

    console.log("📁 پوشه‌های اصلی پروژه با موفقیت ساخته شدند.");
}

//------------------------------------
// 📦 نصب پکیج‌ها
//------------------------------------
function installPackages() {
    const dependencies = [
        "express",
        "mongoose",
        "dotenv",
        "helmet",
        "cors",
        "morgan",
        "express-rate-limit",
        "bcrypt",
        "jsonwebtoken",
    ];

    const devDependencies = ["nodemon", "jest", "supertest"];

    console.log("📦 در حال نصب پکیج‌های اصلی...");
    execSync(`npm install ${dependencies.join(" ")} --save`, { stdio: "inherit" });

    console.log("🧰 در حال نصب پکیج‌های مخصوص توسعه...");
    execSync(`npm install ${devDependencies.join(" ")} --save-dev`, {
        stdio: "inherit",
    });

    console.log("✅ نصب تمام پکیج‌ها با موفقیت انجام شد.");
}

//------------------------------------
// 🗂 ایجاد فایل‌های اصلی پروژه
//------------------------------------
function createFiles() {
    // ✅ server.js
    fs.writeFileSync(
        "server.js",
        `require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(\`✅ سرور با موفقیت روی پورت \${PORT} اجرا شد.\`));
  } catch (err) {
    console.error('❌ خطا در اتصال به پایگاه داده:', err.message);
    process.exit(1);
  }
})();
`
    );

    // ✅ src/app.js
    fs.writeFileSync(
        "src/app.js",
        `const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./interfaces/http/routes');

const app = express();

// 🛡️ پیکربندی امنیت و میان‌افزارها
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 🚦 محدودیت تعداد درخواست‌ها در هر دقیقه
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

// 📌 مسیر اصلی API
app.use('/api', routes);

// ⚠️ مدیریت خطاهای کلی
app.use((err, req, res, next) => {
  console.error('🔥 خطا:', err);
  res.status(err.statusCode || 500).json({
    موفق: false,
    پیام: err.message || 'خطای داخلی سرور',
  });
});

module.exports = app;
`
    );

    // ✅ src/config/database.js (نسخه بدون هشدار)
    fs.writeFileSync(
        "src/config/database.js",
        `const mongoose = require('mongoose');

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
`
    );

    // ✅ src/core/errors/customError.js
    fs.writeFileSync(
        "src/core/errors/customError.js",
        `class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
`
    );

    // ✅ src/interfaces/http/routes/index.js
    fs.writeFileSync(
        "src/interfaces/http/routes/index.js",
        `const express = require('express');
const router = express.Router();

const customerRoutes = require('../../../../src/modules/user/customer/interfaces/http/customerRoutes');

router.use('/customers', customerRoutes);

router.get('/', (req, res) => {
  res.json({ پیام: '✅ API با موفقیت در حال اجراست' });
});

module.exports = router;
`
    );

    // ✅ مثال مسیر مشتری
    fs.writeFileSync(
        "src/modules/user/customer/interfaces/http/customerRoutes.js",
        `const express = require('express');
const router = express.Router();

// 📌 مثال ساده برای GET
router.get('/', (req, res) => {
  res.json({ پیام: 'لیست مشتری‌ها' });
});

module.exports = router;
`
    );

    // ✅ فایل .env
    fs.writeFileSync(
        ".env",
        `PORT=3000
DB_URI=mongodb://127.0.0.1:27017/cleanarch-shop
JWT_SECRET=رمز_محرمانه_من
TOKEN_EXPIRES_IN=1d
`
    );

    // ✅ jest.config.js
    fs.writeFileSync(
        "jest.config.js",
        `module.exports = {
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
};
`
    );

    // ✅ package.json کامل و استاندارد
    const packageJson = {
        name: "cleanarch-shop",
        version: "1.0.0",
        description:
            "🛍️ پروژه فروشگاه اینترنتی طراحی‌شده با Node.js بر اساس معماری Clean Architecture",
        main: "server.js",
        scripts: {
            start: "node server.js",
            dev: "nodemon server.js",
            test: "jest --runInBand",
            lint: "eslint . --ext .js",
            format: "prettier --write .",
        },
        author: "توسعه‌دهنده: حامد",
        license: "MIT",
        keywords: [
            "nodejs",
            "clean-architecture",
            "express",
            "mongodb",
            "ecommerce",
            "repository-pattern",
        ],
        engines: {
            node: ">=18.0.0",
            npm: ">=9.0.0",
        },
    };

    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

    console.log("🗂 فایل‌های اصلی پروژه و package.json با موفقیت ایجاد شدند.");
}

//------------------------------------
// 🚀 اجرای مراحل ساخت پروژه
//------------------------------------
(async () => {
    try {
        console.log("🚀 شروع آماده‌سازی پروژه Node.js...");
        createFolders();
        installPackages();
        createFiles();
        console.log("\n✅ پروژه با موفقیت ساخته شد و آماده‌ی اجراست! 🚀");
    } catch (err) {
        console.error("❌ خطا در اجرای اسکریپت:", err.message);
    }
})();
