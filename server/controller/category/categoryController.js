const categoryModel = require("../../models/categorySchema");
async function getAllCategories(limit, from) {
  try {
    let result = await categoryModel.find({}, { __v: false });

    if (limit) {
      result = result.slice(from, limit);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addCategory(categoryName) {
  try {
    const result = await categoryModel.insertMany([{ name: categoryName }]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function editCategory(category) {
  try {
    const result = await categoryModel.updateOne(
      { _id: category._id },
      { name: category.name }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllCategories, addCategory, editCategory };
