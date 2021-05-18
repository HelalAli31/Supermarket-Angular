require("dotenv").config();
const createConnection = require("../connection/index");
const { insertProductsToDB } = require("./SeedController/products");
const { insertCategoryToDB } = require("./SeedController/category");
const { insertUsersToDB } = require("./SeedController/users");
const { insertCartToDB } = require("./SeedController/cart");
const { insertCartItemsToDB } = require("./SeedController/cartItems");

createConnection();

setTimeout(() => {
  // insertCategoryToDB();
  // insertProductsToDB();
  insertUsersToDB();
  // insertCartToDB();
  // insertCartItemsToDB();
}, 1000);
