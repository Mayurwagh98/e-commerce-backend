const express = require("express");
const router = express.Router();
const { userProfile, updateProfile } = require("../controller/user.controller");
const userAuth = require("../middlewares/auth.middleware");

router.get("/myprofile", userAuth, userProfile);
router.patch("/update-my-profile", userAuth, updateProfile);

module.exports = router;
