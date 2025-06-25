const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken._id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = userAuth;
