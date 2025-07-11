const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user_id: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    lowercase: true,
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
