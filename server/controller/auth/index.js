const usersModel = require("../../models/usersSchema");
const logger = require("../../logger");
async function isUserRegistered(email, password) {
  try {
    const result = await usersModel.find(
      { $and: [{ email: email }, { password: password }] },
      { __v: false }
    );
    return result;
  } catch (error) {
    logger.error(error);
  }
}

async function createUser(userValues) {
  try {
    const result = await usersModel.insertMany([userValues]);
    return result;
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { isUserRegistered, createUser };
