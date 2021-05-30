const orderModel = require("../../models/orderSchema");
async function getOrder(cartId) {
  try {
    const result = await orderModel.find({ cart_id: cartId }, { __v: false });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addOrder(order) {
  try {
    console.log("add order");
    if (!order) return;
    const result = await orderModel.insertMany([order]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getOrdersNumber() {
  try {
    const result = await orderModel.countDocuments();
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getOrder, addOrder, getOrdersNumber };
