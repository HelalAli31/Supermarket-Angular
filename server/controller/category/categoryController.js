const categoryModel = require("../../models/categorySchema");
async function getAllCategories() {
  try {
    const result = await categoryModel.find({}, { __v: false });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addCategory(categoryName) {
  try {
    console.log(categoryName);
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
