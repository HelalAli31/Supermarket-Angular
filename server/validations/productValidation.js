const Joi = require("@hapi/joi");

const ProductActionSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, "").optional(),
  filename: Joi.string().allow(null, "").optional(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

const validationsObj = {
  ProductAction: (req, res, next) => {
    const { error } = ProductActionSchema.validate(req.body.product);
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
