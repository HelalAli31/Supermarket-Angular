const Joi = require("@hapi/joi");

const registerSchema = Joi.object().keys({
  email: Joi.string().min(1).max(50).required().email(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required(),
  personal_id: Joi.number().required(),
  city: Joi.string().optional(),
  street: Joi.string().optional(),
  role: Joi.string().optional(),
});

const LoginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const changePasswordSchema = Joi.object().keys({
  email: Joi.string().min(1).max(50).required().email(),
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required(),
});

const validationsObj = {
  register: (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  changePassword: (req, res, next) => {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  login: (req, res, next) => {
    const { error } = LoginSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
};

function getValidationFunction(path) {
  return validationsObj[path];
}

module.exports = getValidationFunction;
