const express = require("express");
const {
  getAllCategories,
  addCategory,
} = require("../controller/category/categoryController");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    if (!categories) throw new Error();
    return res.json(categories);
  } catch (error) {
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});
router.post("/addCategory", async (req, res, next) => {
  try {
    const category = await addCategory(req.body.product);
    if (!category) throw new Error();
    return res.send("category has been added!");
  } catch (error) {}
  return next({ message: "GENERAL ERROR", status: 400 });
});

module.exports = router;
