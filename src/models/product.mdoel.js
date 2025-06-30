const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  decription: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  category: {
    type: String,
  },
  discount: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
