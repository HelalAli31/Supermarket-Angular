const Joi = require("@hapi/joi");

const addCategorySchema = Joi.object().keys({
  categoryName: Joi.string().required(),
});
const editCategorySchema = Joi.object().keys({
  _id: Joi.string().required(),
  name: Joi.string().required(),
});

const validationsObj = {
  addCategory: (req, res, next) => {
    const { error } = addCategorySchema.validate(req.body.categoryName);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  editCategory: (req, res, next) => {
    const { error } = editCategorySchema.validate(req.body.category);
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
