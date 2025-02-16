const authService = require('../services/authService');
const jwt = require('jsonwebtoken'); // Assuming you're using jsonwebtoken for token handling
const tokenBlacklist = require('../services/tokenBlacklist');
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    
    // Decode the token to get user data
    const decoded = jwt.decode(token).data;
    
    // Assuming the decoded token contains user information such as userId and email
    const userData = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      role_id: decoded.role_id,
      membership_type: decoded.membership_type,
    };


    // Respond with the token and user data
    res.json({ token, userData: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(400).json({ message: 'Authorization header is missing' });
    }

    // The token is the part after 'Bearer '
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'No token provided in authorization header' });
    }

    // Decode the token to get its information
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Add the token to the blacklist (or any other logout action you need)
    await tokenBlacklist.add(token);

    // Respond with success
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out: ' + error.message });
  }
};
