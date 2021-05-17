const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
