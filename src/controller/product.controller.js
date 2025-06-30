const Product = require("../models/product.model");

const addProduct = async (req, res) => {
  const exisitingProduct = await Product.findOne({ title: req.body.title });

  if (exisitingProduct) {
    return res.status(400).json({ message: "Product already exists" });
  }
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addProduct };
