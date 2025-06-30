const express = require("express");
const {
  addProduct,
  getAllProducts,
  productdetails,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const userAuth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add-product", userAuth, addProduct);
router.get("/all-product", userAuth, getAllProducts);
router.get("/product-details", userAuth, productdetails);
router.patch("/update-product", userAuth, updateProduct);
router.delete("/delete-product", userAuth, deleteProduct);

module.exports = router;
