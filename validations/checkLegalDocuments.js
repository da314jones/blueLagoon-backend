const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'number.min': '{{#label}} must be at least {{#limit}}.',
  'any.required': '{{#label}} is required.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'date.base': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD).',
};

const legalDocumentsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  title: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
  content: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  version: Joi.number().integer().min(1).required()
    .messages({
      ...errorMessages,
    }),
  effective_date: Joi.date().iso().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  legalDocumentsValidationSchema,
};
