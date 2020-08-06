const mongoose = require("mongoose");

// schema database for product
const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
