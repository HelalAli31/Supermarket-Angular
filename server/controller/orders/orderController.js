const orderModel = require("../../models/orderSchema");
async function getOrder(orderId) {
  try {
    const result = await orderModel.find({ _id: orderId }, { __v: false });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addOrder(order) {
  try {
    console.log("add order")
    if (!order) return;
    const result = await orderModel.insertMany([order]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getOrder, addOrder };
