module.exports = {
    generateOtp() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },
  
    async sendOtp(mobile, otp) {
      console.log(`📤 Sending OTP ${otp} to mobile ${mobile}`);
      return { success: true, message: 'OTP sent to mobile' };
    }
  };
  