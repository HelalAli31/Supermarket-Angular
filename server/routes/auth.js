const express = require("express");
const { isUserRegistered, createUser } = require("../controller/auth");
const getValidationFunction = require("../validations/login.validation");
const router = express.Router();
const { signJWT } = require("../controller/JWT/jwt");
const logger = require("../logger/index");

router.post(
  "/login",
  getValidationFunction("login"),
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) res.send("error");
    logger.info(`${email} is trying to loggin`);

    const result = await isUserRegistered(email, password);
    if (result?.length) {
      {
        const userToken = await signJWT(result);
        return res.json({
          userToken,
        });
      }
    } else {
      logger.error(`login failed by user:${email} and password:${password}`);
      return res.json(`Login Failed`);
    }
  }
);

router.post(
  `/register`,
  getValidationFunction("register"),
  async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    if (!email) throw new Error("general error");
    try {
      const result = await isUserRegistered(email);
      if (result[0]) {
        console.log("found");
        throw new Error(`User ${email} is already exist`);
      }
      const create = await createUser(req.body);
      if (create) {
        logger.info(`${req.body.email} has just joined us `);
        return res.json(`Registration completed`);
      } else throw new Error("Registration Failed");
    } catch (ex) {
      logger.error("userName is already exists");
      return res.json({
        message: "this userName is already exists!",
        data: email,
      });
    }
  }
);

module.exports = router;
