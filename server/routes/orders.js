const express = require("express");
const {
  getOrder,
  addOrder,
  getOrdersNumber,
  getAllOrders,
} = require("../controller/orders/orderController");
const router = express.Router();
const { verifyJWT } = require("../controller/JWT/jwt");
const logger = require("../logger/index");
const getValidationFunction = require("../validations/orderValidation");

router.get("/getOrdersNumber", async (req, res, next) => {
  try {
    const order = await getOrdersNumber(req.body.order);
    if (!order) throw new Error();
    return res.json(order);
  } catch (error) {
    console.log(error);
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});

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

router.post("/", getValidationFunction("getOrder"), async (req, res, next) => {
  try {
    const { cartId } = req.query;
    const order = await getOrder(cartId);
    if (!order) throw new Error();
    return res.json({ order });
  } catch (error) {
    console.log(error);
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});
router.post("/All", async (req, res, next) => {
  try {
    const order = await getAllOrders();
    if (!order) throw new Error();
    return res.json({ order });
  } catch (error) {
    console.log(error);
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});

router.post(
  "/addOrder",
  getValidationFunction("addOrder"),
  async (req, res, next) => {
    try {
      console.log(req.body.order);
      const order = await addOrder(req.body.order);
      if (!order) throw new Error();
      return res.json({ order: order, message: "order Successfully!" });
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

module.exports = router;
