const Joi = require('joi');

// Define centralized error messages for validation rules
const errorMessages = {
  'string.alphanumeric': '{{#label}} should only contain alphanumeric characters',
  'string.min': '{{#label}} should have at least {#limit} characters',
  'string.max': '{{#label}} should not exceed {#limit} characters',
  'string.email': 'Invalid email format',
  'any.required': '{{#label}} is required',
  'string.uri': '{{#label}} is not a valid URL',
  'string.pattern.base': '{{#label}} must be in the format HH:MM (e.g., 14:30)',
  'number.base': '{{#label}} must be a number',
  'number.integer': '{{#label}} must be an integer',
  'number.min': '{{#label}} must be at least {#limit}',
  'date.base': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD)',
  'date.timestamp': '{{#label}} must be a valid timestamp',
};

const userConsentLogsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  document_id: Joi.number().integer().required().messages(errorMessages),
  consent_date: Joi.date().timestamp().required().messages(errorMessages),
  version: Joi.number().integer().min(1).required().messages(errorMessages),
});

module.exports = {
  userConsentLogsValidationSchema
};
