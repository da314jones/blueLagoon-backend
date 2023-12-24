const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'date.base': '"{{#label}}" must be a valid date',
  'any.required': '"{{#label}}" is a required field'
};

const consentLogsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  document_id: Joi.number().integer().required().messages(errorMessages), // Assuming this is correct field name
  consent_date: Joi.date().iso().required().messages(errorMessages),
  version: Joi.number().integer().required().messages(errorMessages)
});

module.exports = { consentLogsValidationSchema };
