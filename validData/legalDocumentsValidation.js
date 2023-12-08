const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const legalDocumentsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  title: Joi.string().required().messages(errorMessages),
  content: Joi.string().required().messages(errorMessages),
  version: Joi.number().integer().required().messages(errorMessages),
  effective_date: Joi.date().iso().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  legalDocumentsValidationSchema,
};
