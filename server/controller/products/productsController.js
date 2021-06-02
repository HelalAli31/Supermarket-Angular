const productModel = require("../../models/productSchema");
const categoryModel = require("../../models/categorySchema");
async function getAllProducts(from, limit, value, key) {
  try {
    if (value === "All") from = 0;
    if (key && value) {
      const result = await productModel
        .find({}, { __v: false })
        .populate("category", "name", categoryModel);

      const filteredProducts = result.filter((item) => {
        let filterBy = key == "_id" ? item["category"]._id : item[key];
        return filterBy.toString().includes(value);
      });
      return filteredProducts.slice(0, limit);
    }
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
    const result = await productModel.updateOne({ _id: product._id }, product);
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function productsNumber(product) {
  try {
    const result = await productModel.countDocuments();
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllProducts, addProduct, updateProduct, productsNumber };
