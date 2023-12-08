const Joi = require('joi');

// Define centralized error messages for validation rules
const errorMessages = {
  'number.integer': '{{#label}} must be an integer',
  'string.max': '{{#label}} should not exceed {#limit} characters',
  'any.required': '{{#label}} is required',
};

const affiliatesValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  Name: Joi.string().max(255).required().messages(errorMessages),
  ServiceOrProduct: Joi.string().required().messages(errorMessages),
  DiscountDetails: Joi.string().required().messages(errorMessages),
  ContactInfo: Joi.string().required().messages(errorMessages),
});

module.exports = {
  affiliatesValidationSchema
};
