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
    const allProducts = await Product.find({});

    res.status(200).json({ success: true, products: allProducts });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const productdetails = async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ message: "Product id is required" });
  }
  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    res.status(200).json({ success: true, product: existingProduct });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.query;
  if (!productId) {
    return res.status(400).json({ message: "Product id is required" });
  }
  try {
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(400).json({ message: "Product does not exist" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addProduct, getAllProducts, productdetails, updateProduct };
