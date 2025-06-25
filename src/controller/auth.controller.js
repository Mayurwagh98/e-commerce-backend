const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validations");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    validateSignUpData(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User({ ...req.body, password: hashedPassword });

    const user = await newUser.save();

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  try {
    const isValidPassword = await existingUser.validatePassword(password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = await existingUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
