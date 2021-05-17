const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  amount: {
    type: Number,
    require: true,
  },
  full_price: {
    type: Number,
    require: true,
  },
});

const CartItemsModel = mongoose.model("cartItems", cartItemsSchema);
module.exports = CartItemsModel;
