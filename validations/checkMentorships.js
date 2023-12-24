const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'string.base': '"{{#label}}" must be text',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in YYYY-MM-DD format',
  'any.required': '"{{#label}}" is a required field',
};

const mentorshipsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  mentor_id: Joi.number().integer().required().messages(errorMessages),
  mentee_id: Joi.number().integer().required().messages(errorMessages),
  startDate: Joi.date().iso().required().messages(errorMessages),
  Notes: Joi.string().messages(errorMessages),
});

module.exports = {
  mentorshipsValidationSchema,
};
