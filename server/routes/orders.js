const express = require("express");
const { getOrder, addOrder } = require("../controller/orders/orderController");
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
    const { orderId } = req.query;
    console.log(orderId);
    const order = await getOrder(orderId);
    if (order) {
      return res.json({ order });
    }
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
});

router.post("/addOrder", async (req, res, next) => {
  try {
    console.log(req.body.order);
    const order = await addOrder(req.body.order);
    if (order) {
      return res.json({ order: order, message: "order Successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
});

module.exports = router;
