const express = require("express");
const {
  addProduct,
  getAllProducts,
} = require("../controller/product.controller");
const userAuth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add-product", userAuth, addProduct);
router.get("/all-product", userAuth, getAllProducts);

module.exports = router;
