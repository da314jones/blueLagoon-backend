const Joi = require('joi');

// Define centralized error messages for validation rules
const errorMessages = {
  'number.integer': '{{#label}} must be an integer',
  'date.timestamp.base': '{{#label}} must be a valid timestamp',
  'number.min': '{{#label}} must be at least {#limit}',
  'any.required': '{{#label}} is required',
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
