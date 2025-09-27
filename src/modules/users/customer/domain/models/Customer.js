export default class Customer {
    constructor({ username, fullName, email, password, role = 'customer' }) {
      this.username = username;
      this.fullName = fullName;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  