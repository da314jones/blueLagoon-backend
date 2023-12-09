const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'date.base': '"{{#label}}" must be a valid date',
  'any.required': '"{{#label}}" is a required field',
};

const userConnectionsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user1_id: Joi.number().integer().required().messages(errorMessages),
  user2_id: Joi.number().integer().required().messages(errorMessages),
  ConnectionOn: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { userConnectionsValidationSchema };
