const productModel = require("../models/productSchema");
const categoryModel = require("../models/categorySchema");
async function getAllProducts(from, limit) {
  try {
    const result = await productModel
      .find({}, { __v: false })
      .populate("category", "name", categoryModel)
      .limit(Number(limit))
      .skip(Number(from));
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addProduct(product) {
  try {
    const result = await productModel.insertMany([product]);
    if (result) console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(product) {
  console.log(product);

  try {
    const result = await productModel.findOneAndUpdate(
      { _id: product._id },
      product
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id) {
  try {
    const result = await productModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllProducts, addProduct, deleteProduct, updateProduct };
