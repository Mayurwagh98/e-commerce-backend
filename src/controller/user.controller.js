const User = require("../models/user.model");
const { validateEditProfileData } = require("../utils/validations");

const userProfile = async (req, res) => {
  try {
    const user = req.user;

    const sanitizedUser = user.toObject();

    delete sanitizedUser.password;

    res.status(200).json({ success: true, user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const updates = req.body;

    const loggedInUser = req.user;

    Object.keys(updates).forEach((key) => (loggedInUser[key] = updates[key]));

    await loggedInUser.save();

    res
      .status(200)
      .json({ success: true, user: loggedInUser, message: "Profile Updated" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  userProfile,
  updateProfile,
};
