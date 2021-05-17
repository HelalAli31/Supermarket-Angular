const express = require("express");
const {
  getAllCategories,
  addCategory,
} = require("../controller/categoryController");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const categories = await getAllCategories();
  if (categories) {
    return res.json(categories);
  }
});
router.post("/addCategory", async (req, res, next) => {
  console.log("add");
  const category = await addCategory(req.body.product);
  if (category) return res.send("product has been added!");
  return res.send("something went wrong!");
});

module.exports = router;
