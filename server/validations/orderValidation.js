const Joi = require("@hapi/joi");

const OrderSchema = Joi.object().keys({
  cartId: Joi.string().required(),
});
const AddOrderSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  cart_id: Joi.string().required(),
  order_date: Joi.date().required(),
  order_delivery_date: Joi.date().required(),
  total_price: Joi.number().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  total_price: Joi.number().required(),
});

const validationsObj = {
  addOrder: (req, res, next) => {
    const { error } = AddOrderSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  getOrder: (req, res, next) => {
    const { error } = OrderSchema.validate(req.query);
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
