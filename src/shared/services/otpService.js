// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;  
// const authToken = process.env.TWILIO_AUTH_TOKEN;    
// const fromPhone = process.env.TWILIO_PHONE_NUMBER;  // شماره ارسالی شما در Twilio

// if (!accountSid || !authToken || !fromPhone) {
//   throw new Error('TWILIO_ACCOUNT_SID یا TWILIO_AUTH_TOKEN یا TWILIO_PHONE_NUMBER تنظیم نشده');
// }

// const client = twilio(accountSid, authToken);

// const otpService = {
  
//   // تولید کد شش رقمی OTP
//   generateOtp: () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   },

//   // بازگردانی زمان انقضای OTP (مثلا 5 دقیقه آینده)
//   getExpireDate: () => {
//     const now = new Date();
//     now.setMinutes(now.getMinutes() + 5);
//     return now;
//   },

//   // ارسال پیامک حاوی کد OTP به شماره موبایل
//   sendOtpSms: async (mobile, otp) => {
//     // توجه: شماره موبایل باید به فرمت بین‌المللی E.164 باشد، مثلا +989123456789
//     try {
//       await client.messages.create({
//         body: `کد تایید شما: ${otp}`,
//         from: fromPhone,
//         to: mobile,
//       });
//       console.log(`پیامک OTP به ${mobile} ارسال شد`);
//       return true;
//     } catch (error) {
//       console.error('خطا در ارسال پیامک OTP:', error.message);
//       throw error;
//     }
//   }
// };

// export default otpService;




//fake otp send
const otpService = {
    generateOtp: () => {
      // تولید کد 6 رقمی فیک
      return Math.floor(100000 + Math.random() * 900000).toString();
    },
  
    getExpireDate: () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5); // انقضای 5 دقیقه‌ای
      return now;
    },
  
    // متد ارسال پیامک فقط لاگ می‌زند، ارسال واقعی ندارد
    sendOtpSms: async (mobile, otp) => {
      // فقط چاپ در کنسول
      console.log(`[Fake SMS] ارسال کد OTP به شماره ${mobile}: ${otp}`);
      // بدون خطا برگشت می‌دهد
      return true;
    }
  };
  
  export default otpService;
  