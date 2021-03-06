const mongoose = require("mongoose");

// schema database for order
const orderSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, defualt: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
