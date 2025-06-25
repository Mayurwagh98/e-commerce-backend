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

module.exports = {
  userProfile,
};
