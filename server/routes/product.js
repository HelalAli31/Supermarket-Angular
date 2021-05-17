const express = require("express");
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productsController");
const axios = require("axios");
const router = express.Router();
const logger = require("../logger");
const { verifyJWT } = require("../controller/JWT/jwt");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.body.Authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    const verify = await verifyJWT(lastToken);
    if (verify.data[0].role) return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { from, limit } = req.query;
  const { keyName, valueName } = req.body;
  const result = await getAllProducts(from, limit, valueName, keyName);
  if (result) return res.json(result);
});

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.body.Authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    const verify = await verifyJWT(lastToken);
    if (verify.data[0].role === "admin") return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.post("/addProduct", async (req, res, next) => {
  console.log("add");
  const result = await addProduct(req.body.product);
  if (result) return res.json({ success: "product has been added!" });
  return res.json({ fail: "something went wrong!" });
});

router.put("/updateProduct", async (req, res, next) => {
  const result = await updateProduct(req.body.product);
  if (result) return res.send("product has been updated!");
  return res.send("something went wrong!");
});
module.exports = router;
