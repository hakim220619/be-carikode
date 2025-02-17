const db = require('../config/db');

class Aplikasi {
  static async findAplikasi(email) {
    const [rows] = await db.query('SELECT * FROM setting_aplikasi WHERE email = ?', [email]);
    return rows[0];
  }
  
  
}

module.exports = Aplikasi;