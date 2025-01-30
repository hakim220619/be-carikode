const User = require('../models/userModel');

const getProfile = async (userId) => {
  const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
  return rows[0];
};

module.exports = { getProfile };