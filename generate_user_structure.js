import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// بدست آوردن مسیر جاری فایل در ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// مسیر پایه پوشه user (جایی که فایل اجرا میشه)
const baseDir = __dirname;

// نقش‌ها
const roles = ['admin', 'customer', 'seller'];

function createStructure() {
  // shared
  makeDir(path.join(baseDir, 'shared', 'validations'));
  makeFile(path.join(baseDir, 'shared', 'validations', 'registerValidation.js'));
  makeFile(path.join(baseDir, 'shared', 'validations', 'otpValidation.js'));

  makeDir(path.join(baseDir, 'shared', 'utils'));
  makeFile(path.join(baseDir, 'shared', 'utils', 'hashPassword.js'));
  makeFile(path.join(baseDir, 'shared', 'utils', 'generateOtp.js'));
  makeFile(path.join(baseDir, 'shared', 'utils', 'errorHandler.js'));

  makeDir(path.join(baseDir, 'shared', 'constants'));
  makeFile(path.join(baseDir, 'shared', 'constants', 'messages.js'));

  // auth
  makeDir(path.join(baseDir, 'auth', 'application', 'usecases'));
  makeFile(path.join(baseDir, 'auth', 'application', 'usecases', 'SendOtpUseCase.js'));
  makeFile(path.join(baseDir, 'auth', 'application', 'usecases', 'VerifyOtpUseCase.js'));
  makeFile(path.join(baseDir, 'auth', 'application', 'usecases', 'LoginWithOtpUseCase.js'));

  makeDir(path.join(baseDir, 'auth', 'application', 'services'));
  makeFile(path.join(baseDir, 'auth', 'application', 'services', 'OtpService.js'));

  makeDir(path.join(baseDir, 'auth', 'infrastructure', 'controllers'));
  makeFile(path.join(baseDir, 'auth', 'infrastructure', 'controllers', 'AuthController.js'));

  makeDir(path.join(baseDir, 'auth', 'infrastructure', 'routes'));
  makeFile(path.join(baseDir, 'auth', 'infrastructure', 'routes', 'auth.routes.js'));

  makeFile(path.join(baseDir, 'auth', 'index.js'));

  // نقش‌ها
  roles.forEach(role => {
    const roleDir = path.join(baseDir, role);

    makeDir(path.join(roleDir, 'domain'));
    makeFile(path.join(roleDir, 'domain', `${capitalize(role)}Entity.js`));

    makeDir(path.join(roleDir, 'application', 'usecases'));
    makeFile(path.join(roleDir, 'application', 'usecases', `Register${capitalize(role)}UseCase.js`));
    makeFile(path.join(roleDir, 'application', 'usecases', `Profile${capitalize(role)}UseCase.js`));

    makeDir(path.join(roleDir, 'application', 'services'));
    makeFile(path.join(roleDir, 'application', 'services', `${capitalize(role)}Service.js`));

    makeDir(path.join(roleDir, 'infrastructure', 'models'));
    makeFile(path.join(roleDir, 'infrastructure', 'models', `${capitalize(role)}Model.js`));

    makeDir(path.join(roleDir, 'infrastructure', 'repositories'));
    makeFile(path.join(roleDir, 'infrastructure', 'repositories', `${capitalize(role)}Repository.js`));

    makeDir(path.join(roleDir, 'infrastructure', 'controllers'));
    makeFile(path.join(roleDir, 'infrastructure', 'controllers', `${capitalize(role)}Controller.js`));

    makeDir(path.join(roleDir, 'infrastructure', 'routes'));
    makeFile(path.join(roleDir, 'infrastructure', 'routes', `${role}.routes.js`));

    makeFile(path.join(roleDir, 'index.js'));
  });
}

function makeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log('📁 پوشه ساخته شد:', dirPath);
  }
}

function makeFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log('📄 فایل ساخته شد:', filePath);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

createStructure();
