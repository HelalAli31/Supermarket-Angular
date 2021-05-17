require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createConnection = require("./connection/index");
const bodyParser = require("body-parser");
const procuctsRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const userRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
//Routes
const app = express();

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.json());

createConnection();

app.use("/auth", userRoute);
app.use("/products", procuctsRoute);
app.use("/cart", cartRoute);
app.use("/category", categoryRoute);

app.listen(5000);
