const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  personal_id: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: false,
  },
  street: {
    type: String,
    require: false,
  },
  role: {
    type: String,
    require: true,
    default: "user",
  },
});

const UsersModel = mongoose.model("users", usersSchema);
module.exports = UsersModel;
