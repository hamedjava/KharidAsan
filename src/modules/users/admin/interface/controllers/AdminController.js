import Admin from '../../../../users/admin/infrastructure/models/AdminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpService from '../../../../../shared/services/otpService.js';

/* ========================
   ✅ ایجاد ادمین
======================== */
export const createAdmin = async (req, res) => {
  try {
    const { username, fullName, email, password, mobile } = req.body;

    if (!username || !fullName || !email || !password || !mobile) {
      return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      fullName,
      email,
      password: hashedPassword,
      mobile
    });

    const savedAdmin = await admin.save();
    return res.status(201).json(savedAdmin);
  } catch (err) {
    console.error('خطا در createAdmin:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ دریافت همه ادمین‌ها
======================== */
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.json(admins);
  } catch (err) {
    console.error('خطا در getAdmins:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ دریافت ادمین بر اساس ID
======================== */
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'ادمین یافت نشد' });
    return res.json(admin);
  } catch (err) {
    console.error('خطا در getAdminById:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ آپدیت ادمین
======================== */
export const updateAdmin = async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'ادمین یافت نشد' });
    return res.json(updated);
  } catch (err) {
    console.error('خطا در updateAdmin:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ حذف ادمین
======================== */
export const deleteAdmin = async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'ادمین یافت نشد' });
    return res.json({ message: 'ادمین حذف شد' });
  } catch (err) {
    console.error('خطا در deleteAdmin:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ ارسال OTP
======================== */
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    const admin = await Admin.findOne({ mobile });
    if (!admin) return res.status(404).json({ error: 'ادمین یافت نشد' });

    const otpGenerated = otpService.generateOtp();
    admin.otpCode = otpGenerated;
    admin.otpExpire = otpService.getExpireDate();
    await admin.save();

    console.log(`کد OTP برای موبایل ${mobile} ارسال شد: ${otpGenerated}`);
    return res.status(200).json({
      message: 'کد OTP ارسال شد',
      otpCode: otpGenerated // ⚠ فقط برای محیط تست
    });
  } catch (err) {
    console.error('خطا در sendOtp:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ ورود با OTP
======================== */
export const loginWithOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
      return res.status(400).json({ error: 'موبایل و کد OTP الزامی هستند' });
    }

    const admin = await Admin.findOne({ mobile });
    if (!admin) return res.status(404).json({ error: 'ادمین یافت نشد' });

    if (admin.otpCode !== otp) {
      return res.status(401).json({ error: 'کد OTP اشتباه است' });
    }

    if (Date.now() > admin.otpExpire) {
      return res.status(401).json({ error: 'کد OTP منقضی شده است' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'test_secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'ورود موفق با OTP',
      token,
      admin
    });
  } catch (err) {
    console.error('خطا در loginWithOTP:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ ورود با ایمیل/رمز
======================== */
export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'ایمیل و رمز عبور الزامی است' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'ادمین یافت نشد' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'رمز عبور اشتباه است' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'test_secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'ورود موفق',
      token,
      admin
    });
  } catch (err) {
    console.error('خطا در loginWithEmail:', err);
    return res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

/* ========================
   ✅ مسیر امن RBAC
======================== */
export const getSecureData = (req, res) => {
  return res.status(200).json({
    message: 'این داده فقط برای سوپرادمین قابل دسترسی است',
    user: req.user,
    role: req.user?.role || 'unknown'
  });
};
