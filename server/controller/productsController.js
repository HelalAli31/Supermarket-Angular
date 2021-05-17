const productModel = require("../models/productSchema");
const categoryModel = require("../models/categorySchema");
async function getAllProducts(from, limit, value, key) {
  try {
    const result = await productModel
      .find({}, { __v: false })
      .populate("category", "name", categoryModel)
      .limit(Number(limit))
      .skip(Number(from));
    if (key && value) {
      const result = await productModel
        .find({}, { __v: false })
        .populate("category", "name", categoryModel);

      const filteredProducts = result.filter((item) => {
        let filterBy = key == "_id" ? item["category"]._id : item[key];
        return filterBy.toString().includes(value);
      });
      return filteredProducts;
    } else return result;
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

module.exports = { getAllProducts, addProduct, updateProduct };
