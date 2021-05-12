const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  filename: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  },
});
const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
