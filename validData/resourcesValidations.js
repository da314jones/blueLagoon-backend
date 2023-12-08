const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const resourcesValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  title: Joi.string().required().messages(errorMessages),
  link: Joi.string().uri().required().messages(errorMessages),
  description: Joi.string().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  resourcesValidationSchema,
};
