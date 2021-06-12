const express = require("express");
const {
  getCart,
  updateCartStatus,
  getCartItems,
  addItemToCart,
  addCart,
  deleteItemFromCart,
  editAmount,
} = require("../controller/cart/cartController");
const router = express.Router();
const { verifyJWT } = require("../controller/JWT/jwt");
const logger = require("../logger/index");
const getValidationFunction = require("../validations/cart.validation");

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

router.post("/", getValidationFunction("getCart"), async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) throw new Error();
    const cart = await getCart(userId);
    if (!cart) throw new Error();
    return res.json({ cart });
  } catch (error) {
    console.log(error);
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});

router.post(
  "/updateOpenedCartStatus",
  getValidationFunction("updateStatus"),
  async (req, res, next) => {
    try {
      const { cartId } = req.query;
      if (!cartId) throw new Error();
      const cart = await updateCartStatus(cartId);
      if (!cart) return res.json({});
      return res.json({ cart });
    } catch (error) {
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

router.post(
  "/addCart",
  getValidationFunction("addCart"),
  async (req, res, next) => {
    try {
      const { userId } = req.query;
      if (!userId) return res.json("something went wrong");
      const cart = await addCart(userId);
      if (!cart) throw new Error();
      return res.json({ message: "cart added!", data: cart });
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

router.post(
  "/getItems",
  getValidationFunction("getItems"),
  async (req, res, next) => {
    const { cartId } = req.query;
    if (!cartId) return res.json("error");

    const cartItems = await getCartItems(cartId);
    if (!cartItems) throw new Error();
    return res.json(cartItems);
  }
);

router.put(
  "/AddItems",
  getValidationFunction("AddItems"),
  async (req, res, next) => {
    try {
      const { item } = req.body;
      const cartItem = await addItemToCart(item);
      if (!cartItem) throw new Error();
      return res.json(`item added`);
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

router.put(
  "/deleteItem",
  getValidationFunction("deleteItem"),
  async (req, res, next) => {
    try {
      const { itemId } = req.query;
      const cartItems = await deleteItemFromCart(itemId);
      if (!cartItems) throw new Error();
      return res.json("item deleted!");
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);
router.post(
  "/editItemAmount",
  getValidationFunction("editItemAmount"),
  async (req, res, next) => {
    try {
      const { fullPrice, amount, itemId } = req.body.data;
      const cartItem = await editAmount(itemId, amount, fullPrice);
      if (!cartItem) throw new Error();
      return res.json("item edited");
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

module.exports = router;
