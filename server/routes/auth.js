// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Sequelize model for user
const verifyToken = require("../middleware/jwtMiddleware");

const router = express.Router();

// Define the login POST route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Credentials are wrong" });
    }

    // Compare password (bcrypt is used to hash passwords)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Credentials are wrong" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "a715cc5750372437adc174d2460f7f436cbf7473f2dc1574965593130682a3839f92a3a34edbb7877fc191acf84bb4895f28ebec2e3a8fbe939955f22502dff3c021f9208878107daa744f8fe616418ad4e389a392af132a1860a549d09620fa1fd2349256ddcab2f01f278db53a98e5773b463c76941c7bc17f5d8d805415adbaf17982faf14a9326293a8222f4bf58ca421d698e6a009c13e2d0a222acfd89072d741423d60d40dfb68db5deda2cba9f7cffdca0a9d97c6fb442c94b5592ab1a121e7b11147325e4a749cd037fe95128c0a36827b908be47bb13899cd018c7485a9415cadb677a9f08bf4adc8802fa296be7cb07343e71d37a13878f7f5bf0", // Replace with your actual secret key
      { expiresIn: "1h" }
    );

    // Send back the token to the client
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET request to /api/profile (with token verification)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } }); // Fetch user based on decoded token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
