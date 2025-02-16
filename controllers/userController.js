const userService = require("../services/userService");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const logController = require("./logController");


exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      membership_type = "free",
      role_id = 2,
    } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create({
      name,
      email,
      password: hashedPassword,
      membership_type,
      role_id,
    });

    await logController.createLog(
      userId,
      "User registered",
      `User ${name} registered successfully with email ${email}`
    );

    res.status(201).json({
      message: "User registered successfully",
      userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
