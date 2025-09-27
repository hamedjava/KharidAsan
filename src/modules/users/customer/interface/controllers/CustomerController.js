import Customer from '../../../../users/customer/infrastructure/models/CustomerModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpService from '../../../../../shared/services/otpService.js';

// ✅ ایجاد مشتری
export const createCustomer = async (req, res) => {
  try {
    const { username, fullName, email, password, mobile } = req.body;
    if (!username || !fullName || !email || !password || !mobile) {
      return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ username, fullName, email, password: hashedPassword, mobile });
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error('خطا در createCustomer:', err);
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ دریافت همه مشتری‌ها
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ دریافت مشتری بر اساس ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'مشتری یافت نشد' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ آپدیت مشتری
export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'مشتری یافت نشد' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ حذف مشتری
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'مشتری یافت نشد' });
    res.json({ message: 'مشتری حذف شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ ارسال OTP
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    const customer = await Customer.findOne({ mobile });
    if (!customer) return res.status(404).json({ error: 'مشتری یافت نشد' });

    const otpGenerated = otpService.generateOtp();
    customer.otpCode = otpGenerated;
    customer.otpExpire = otpService.getExpireDate();
    await customer.save();

    console.log(`کد OTP برای موبایل ${mobile} ارسال شد: ${otpGenerated}`);
    res.status(200).json({ message: 'کد OTP ارسال شد', otpCode: otpGenerated });
  } catch (err) {
    console.error('خطا در sendOtp:', err);
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ ورود با OTP
export const loginWithOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ error: 'موبایل و کد OTP الزامی هستند' });

    const customer = await Customer.findOne({ mobile });
    if (!customer) return res.status(404).json({ error: 'مشتری یافت نشد' });

    if (customer.otpCode !== otp) return res.status(401).json({ error: 'کد OTP اشتباه است' });
    if (Date.now() > customer.otpExpire) return res.status(401).json({ error: 'کد OTP منقضی شده است' });

    const token = jwt.sign({ id: customer._id, email: customer.email }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'ورود موفق با OTP', token, customer });
  } catch (err) {
    console.error('خطا در loginWithOTP:', err);
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};

// ✅ ورود با ایمیل و رمز عبور
export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'ایمیل و رمز عبور الزامی است' });

    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json({ error: 'مشتری یافت نشد' });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(401).json({ error: 'رمز عبور اشتباه است' });

    const token = jwt.sign({ id: customer._id, email: customer.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'ورود موفق', token, customer });
  } catch (err) {
    console.error('خطا در loginWithEmail:', err);
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};
