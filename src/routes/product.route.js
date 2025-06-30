const express = require("express");
const {
  addProduct,
  getAllProducts,
  productdetails,
  updateProduct,
} = require("../controller/product.controller");
const userAuth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add-product", userAuth, addProduct);
router.get("/all-product", userAuth, getAllProducts);
router.get("/product-details", userAuth, productdetails);
router.patch("/update-product", userAuth, updateProduct);

module.exports = router;
