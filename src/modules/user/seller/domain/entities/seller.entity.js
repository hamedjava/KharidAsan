// seller/domain/entities/seller.entity.js
class Seller {
  constructor({ id, email, mobile, password, otp, shopName, ownerName }) {
    this.id = id;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.otp = otp || null;
    this.shopName = shopName || null;
    this.ownerName = ownerName || null;
  }

  validate() {
    if (!this.email) throw new Error("Email is required");
    if (!this.mobile) throw new Error("Mobile number is required");
    if (!this.password) throw new Error("Password is required");
    return true;
  }
}

module.exports = Seller;
