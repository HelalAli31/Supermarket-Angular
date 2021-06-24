const express = require("express");
const {
  getAllCategories,
  addCategory,
  editCategory,
} = require("../controller/category/categoryController");
const logger = require("../logger/index");
const axios = require("axios");
const { verifyJWT } = require("../controller/JWT/jwt");
const router = express.Router();

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
    const { limit, from } = req.body;
    const categories = await getAllCategories(limit, from);
    if (!categories) throw new Error();
    return res.json(categories);
  } catch (error) {
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});
router.post("/addCategory", async (req, res, next) => {
  try {
    const category = await addCategory(req.body.categoryName);
    if (!category) throw new Error();
    return res.json("category has been added!");
  } catch (error) {
    console.log("general Error");
  }
  return next({ message: "GENERAL ERROR", status: 400 });
});
router.post("/editCategoryName", async (req, res, next) => {
  try {
    const category = await editCategory(req.body.category);
    if (!category) throw new Error();
    return res.json("category has been edited!");
  } catch (error) {
    console.log("general error");
  }
  return next({ message: "GENERAL ERROR", status: 400 });
});

module.exports = router;
