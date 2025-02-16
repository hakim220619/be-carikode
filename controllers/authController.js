const authService = require('../services/authService');
const jwt = require('jsonwebtoken'); // Assuming you're using jsonwebtoken for token handling

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    
    // Decode the token to get user data
    const decoded = jwt.decode(token);
    console.log(decoded);
    
    // Assuming the decoded token contains user information such as userId and email
    const userData = {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name, // Adjust as per the actual structure of your token payload
    };

    // Respond with the token and user data
    res.json({ token, user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
