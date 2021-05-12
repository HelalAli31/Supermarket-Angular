const express = require("express");
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productsController");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { from, limit } = req.query;
  const result = await getAllProducts(from, limit);
  if (result) return res.json(result);
});
router.post("/addProduct", async (req, res, next) => {
  console.log("add");
  const result = await addProduct(req.body.product);
  if (result) return res.send("product has been added!");
  return res.send("something went wrong!");
});
router.post("/deleteProduct", async (req, res, next) => {
  const { id } = req.query;
  const result = await deleteProduct(id);
  if (result) return res.send("product has been deleted!");
  return res.send("something went wrong!");
});
router.put("/updateProduct", async (req, res, next) => {
  const result = await updateProduct(req.body.product);
  if (result) return res.send("product has been updated!");
  return res.send("something went wrong!");
});
module.exports = router;
