const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'string.base': '"{{#label}}" must be a string',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in ISO date format YYYY-MM-DD',
  'any.required': '"{{#label}}" is a required field',
};

const userRegistrationsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  RegistrationDate: Joi.date().iso().required().messages(errorMessages),
  AdditionalInfo: Joi.string().allow('').messages(errorMessages)
});

module.exports = { userRegistrationsValidationSchema };
