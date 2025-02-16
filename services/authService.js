const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const logController = require('../controllers/logController');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const login = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  await logController.createLog(user.id, 'User logged in', `User ${user.name} logged in successfully`);
  return generateToken(user.id);
};

module.exports = { login };