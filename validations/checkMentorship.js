const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'any.required': '{{#label}} is required.',
  'date.base': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD).',
};

const mentorshipValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  mentor_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  mentee_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  StartDate: Joi.date().iso().required()
    .messages({
      ...errorMessages,
    }),
  Notes: Joi.string().allow(null, '')
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  mentorshipValidationSchema,
};
