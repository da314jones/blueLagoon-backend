const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'date.timestamp.base': '{{#label}} must be a valid timestamp.',
  'object.base': '{{#label}} must be an object.',
};

const errorLogsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user_id: Joi.number().integer().allow(null)
    .messages({
      ...errorMessages,
    }),
  error_type: Joi.string().max(50).required()
    .messages({
      ...errorMessages,
    }),
  error_message: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  error_time: Joi.date().timestamp().required()
    .messages({
      ...errorMessages,
    }),
  additional_info: Joi.object().allow(null)
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  errorLogsValidationSchema,
};
