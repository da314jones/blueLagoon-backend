const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'any.required': '{{#label}} is required.',
  'string.empty': '{{#label}} cannot be empty.',
  'date.timestamp.base': '{{#label}} must be a valid timestamp.',
};

const reportsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  reported_by_user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  reported_user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  Content: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  ReportDate: Joi.date().timestamp().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  reportsValidationSchema,
};
