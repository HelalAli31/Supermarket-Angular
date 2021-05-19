const express = require("express");
const {
  getCart,
  getCartItems,
  addItemsToCart,
  addCart,
  deleteItemFromCart,
} = require("../controller/cart/cartController");
const router = express.Router();
const { verifyJWT } = require("../controller/JWT/jwt");
const logger = require("../logger/index");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.body.Authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    const verify = await verifyJWT(lastToken);
    if (verify.data[0].role === "user") return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const cart = await getCart(userId);
    if (cart) {
      return res.json(cart);
    }
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
});

router.post("/addCart", async (req, res, next) => {
  console.log("adddddddddddddddddddddddddddd");
  try {
    const { userId } = req.query;
    const cart = await addCart(userId);
    if (cart) {
      return res.send("cart added!");
    }
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
});

router.post("/Items", async (req, res, next) => {
  const { cartId } = req.query;
  const cartItems = await getCartItems(cartId);
  if (cartItems) {
    return res.json(cartItems);
  }
  return res.send("something went wrong");
});

router.put("/AddItems", async (req, res, next) => {
  try {
    const { item } = req.body;
    const cartItems = await addItemsToCart(item);
    if (cartItems) {
      return res.send("added!");
    }
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
});

router.put("/deleteItem", async (req, res, next) => {
  try {
    console.log("detele");
    const { itemId } = req.query;
    const cartItems = await deleteItemFromCart(itemId);
    if (cartItems) {
      return res.send("item deleted!");
    }
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
});

module.exports = router;
