const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'date.base': '"{{#label}}" must be a valid date',
  'any.required': '"{{#label}}" is a required field',
};

const connectionsValidationSchema = Joi.object({
  user1_id: Joi.number().integer().required().messages(errorMessages),
  user2_id: Joi.number().integer().required().messages(errorMessages),
  connectionOn: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { connectionsValidationSchema };
