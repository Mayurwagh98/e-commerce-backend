const express = require("express");
const { addProduct } = require("../controller/product.controller");
const router = express.Router();

router.post("/add-product", addProduct);

module.exports = router;
