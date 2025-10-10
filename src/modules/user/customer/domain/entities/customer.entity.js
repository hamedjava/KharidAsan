class CustomerEntity {
  constructor({
    id = null,
    name = '',
    email = '',
    mobile = '',
    password = '',
    role = 'customer',
    otp = null,
    createdAt = null,
    updatedAt = null
  } = {}) {
    this.id = id;
    this.name = name;
    this.email = email?.toLowerCase().trim() || null;
    this.mobile = mobile?.trim();
    this.password = password;
    this.role = role;
    this.otp = otp ? { code: otp.code, expiresAt: otp.expiresAt } : null;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDatabase(document) {
    if (!document) return null;
    const obj = document.toObject ? document.toObject() : document;
    return new CustomerEntity({
      id: obj._id?.toString(),
      name: obj.name,
      email: obj.email,
      mobile: obj.mobile,
      password: obj.password,
      role: obj.role,
      otp: obj.otp,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    });
  }

  toDatabaseObject() {
    return {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      role: this.role,
      otp: this.otp
    };
  }
}

module.exports = CustomerEntity;
