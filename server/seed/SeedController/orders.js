const CartModel = require("../../models/cartSchema");
const UserModel = require("../../models/usersSchema");
const OrderModel = require("../../models/orderSchema");

async function insertOrdersToDB() {
  try {
    const resultFind = await OrderModel.find();
    const resultUser = await UserModel.find();
    const resultCart = await CartModel.find();
    if (resultFind.length) return;
    const result = await OrderModel.insertMany(
      getOrderssData(resultUser[1]?._id, resultCart[0]?._id)
    );
    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    process.exit(0);
  }
}

function getOrderssData(userId, cartId) {
  return [
    {
      user_id: userId,
      cart_id: cartId,
      order_delivery_date: "2021-05-19T18:43:29.454+0000",
      total_price: 600,
      city: "shefamr",
      street: "abu shhab",
      last_visa_number: 1111,
    },
  ];
}

module.exports = { insertOrdersToDB };
