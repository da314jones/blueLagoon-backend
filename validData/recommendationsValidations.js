const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const recommendationsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  category: Joi.string().required().messages(errorMessages),
  items: Joi.array().items(Joi.string()).required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  recommendationsValidationSchema,
};
