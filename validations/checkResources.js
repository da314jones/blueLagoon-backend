const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'string.uri': '{{#label}} must be a valid URI.',
  'boolean.base': '{{#label}} must be a boolean.',
};

const resourcesValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  Title: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
  Type: Joi.string().max(50).required()
    .messages({
      ...errorMessages,
    }),
  Link: Joi.string().uri().required()
    .messages({
      ...errorMessages,
    }),
  LocationBased: Joi.boolean().required()
    .messages({
      ...errorMessages,
    }),
  Location: Joi.when('LocationBased', { is: true, then: Joi.string().max(255).required() })
    .messages({
      'string.empty': '{{#label}} is required when LocationBased is true.',
    }),
});

module.exports = {
  resourcesValidationSchema,
};
