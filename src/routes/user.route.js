const express = require("express");
const router = express.Router();
const { userProfile } = require("../controller/user.controller");
const userAuth = require("../middlewares/auth.middleware");

router.get("/myprofile", userAuth, userProfile);

module.exports = router;
