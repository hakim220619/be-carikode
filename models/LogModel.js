const db = require('../config/db');

class Log {
  // Menambahkan log aktivitas ke dalam database
  static async create({ user_id, action, description }) {
    try {
      const [result] = await db.query(
        'INSERT INTO logs (user_id, action, description) VALUES (?, ?, ?)',
        [user_id, action, description]
      );
      return result.insertId;  // Mengembalikan ID log yang baru dibuat
    } catch (error) {
      throw new Error('Error creating log: ' + error.message);
    }
  }

  // Mendapatkan log berdasarkan user_id
  static async getByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM logs WHERE user_id = ?', [user_id]);
    return rows;
  }
}

module.exports = Log;
