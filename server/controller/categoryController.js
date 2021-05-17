const categoryModel = require("../models/categorySchema");
async function getAllCategories() {
  try {
    const result = await categoryModel.find({}, { __v: false });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addCategory(category) {
  try {
    const result = await categoryModel.insertMany([category]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllCategories, addCategory };
