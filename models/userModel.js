const db = require('../config/db');

class User {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const { name, email, password, membership_type, role_id } = user;
    const now = new Date();
    const uid = `CK${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    
    const [result] = await db.query('INSERT INTO users (uid, name, email, password, membership_type, role_id) VALUES (?, ?, ?, ?, ?, ?)', [uid, name, email, password, membership_type, role_id]);
    return result.insertId;
  }
  
  
}

module.exports = User;