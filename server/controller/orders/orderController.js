const orderModel = require("../../models/orderSchema");
async function getOrder(cartId) {
  try {
    const result = await orderModel.find({ cart_id: cartId }, { __v: false });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getAllOrders(userId) {
  try {
    if (!userId) {
      var result = await orderModel.find({});
    } else {
      var data = await orderModel.find({ user_id: userId });
      if (!Array.isArray(data)) return;
      var result = data.reverse().slice(0, 3);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addOrder(order) {
  try {
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

module.exports = { getOrder, addOrder, getOrdersNumber, getAllOrders };
