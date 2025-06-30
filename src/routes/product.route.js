const express = require("express");
const { addProduct } = require("../controller/product.controller");
const userAuth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add-product", userAuth, addProduct);

module.exports = router;
