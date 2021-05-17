const userModel = require("../../models/usersSchema");

async function insertUsersToDB() {
  try {
    const resultFind = await userModel.find();
    if (resultFind.length) return;
    const result = await userModel.insertMany(getUsersData());
    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    process.exit(0);
  }
}

function getUsersData() {
  return [
    {
      first_name: "helal",
      last_name: "ali",
      email: "helal@hotmail.com",
      personal_id: "123",
      password: "123",
      role: "admin",
    },
    {
      first_name: "gal",
      last_name: "amo",
      email: "gal@hotmail.com",
      personal_id: "1234",
      password: "123",
    },
    {
      first_name: "rafa",
      last_name: "moly",
      email: "rafa@hotmail.com",
      personal_id: "12345",
      password: "123",
    },
  ];
}

module.exports = { insertUsersToDB };
