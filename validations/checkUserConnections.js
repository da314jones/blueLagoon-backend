const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'date.timestamp.base': '{{#label}} must be a valid timestamp.',
};

const userConnectionsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user1_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user2_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  ConnectionOn: Joi.date().timestamp().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  userConnectionsValidationSchema,
};
