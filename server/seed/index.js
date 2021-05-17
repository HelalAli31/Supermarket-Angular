require("dotenv").config();
const createConnection = require("../connection/index");
const { insertProductsToDB } = require("./SeedController/products");
const { insertCategoryToDB } = require("./SeedController/category");
const { insertUsersToDB } = require("./SeedController/users");

createConnection();

setTimeout(() => {
  insertCategoryToDB();
  insertProductsToDB();
  insertUsersToDB();
}, 1000);
