const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'any.required': '{{#label}} is required.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'date.base': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD).',
};

const groupsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  GroupName: Joi.string().max(100).required()
    .messages({
      ...errorMessages,
    }),
  Description: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  CreationDate: Joi.date().iso().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  groupsValidationSchema,
};
