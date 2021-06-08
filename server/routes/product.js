const express = require("express");
const {
  getAllProducts,
  addProduct,
  productsNumber,
  updateProduct,
} = require("../controller/products/productsController");
const axios = require("axios");
const router = express.Router();
const logger = require("../logger");
const { verifyJWT } = require("../controller/JWT/jwt");
const getValidationFunction = require("../validations/productValidation");

router.get("/productsNumber", async (req, res, next) => {
  const result = await productsNumber();
  if (!result) return res.json(0);
  return res.json(result);
});

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
  try {
    const { from, limit } = req.query;
    const { keyName, valueName } = req.body;
    const result = await getAllProducts(from, limit, valueName, keyName);
    if (!result) throw new Error();
    return res.json(result);
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
    if (verify.data[0].role === "admin") return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.post(
  "/addProduct",
  getValidationFunction("ProductAction"),
  async (req, res, next) => {
    try {
      const result = await addProduct(req.body.product);
      if (!result) throw new Error();
      return res.json("product has been added!");
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

router.put(
  "/updateProduct",
  getValidationFunction("ProductAction"),
  async (req, res, next) => {
    try {
      const result = await updateProduct(req.body.product);
      if (!result) throw new Error();
      return res.json("product has been updated!");
    } catch (error) {
      console.log(error);
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);
module.exports = router;
