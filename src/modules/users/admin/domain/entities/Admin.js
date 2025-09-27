export default class Admin {
    constructor({ username, fullName, email, password, role = 'admin' }) {
      this.username = username;
      this.fullName = fullName;    // تغییر از name به fullName
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  