const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'any.required': '{{#label}} is required.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
};

const emergencyContactsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  Name: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
  ContactInfo: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  Description: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  Location: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  emergencyContactsValidationSchema,
};
