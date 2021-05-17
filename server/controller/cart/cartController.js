const cartModel = require("../../models/cartSchema");
const userModel = require("../../models/usersSchema");
const productModel = require("../../models/productSchema");
const cartItemsModel = require("../../models/cartItemsSchema");

async function getCart(userId) {
  try {
    const result = await cartModel
      .find({ user_id: userId }, { __v: false })
      .populate("user_id", "first_name", userModel);
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function getCartItems(cartId) {
  try {
    const result = await cartItemsModel
      .find({ cart_id: cartId }, { __v: false })
      .populate("product_id", productModel);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addItemsToCart(item) {
  try {
    const result = await cartItemsModel.insertMany([item]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getCart, getCartItems, addItemsToCart };
