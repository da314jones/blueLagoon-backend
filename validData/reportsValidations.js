const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const reportsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  title: Joi.string().required().messages(errorMessages),
  content: Joi.string().required().messages(errorMessages),
  author: Joi.string().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  reportsValidationSchema,
};
