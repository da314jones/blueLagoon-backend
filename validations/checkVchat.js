const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'number.min': '{{#label}} must be at least {{#limit}}.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.uri': '{{#label}} must be a valid URI.',
  'date.timestamp.base': '{{#label}} must be a valid timestamp.',
};

const vchatValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  VideoURL: Joi.string().uri().required()
    .messages({
      ...errorMessages,
    }),
  ScheduleTime: Joi.date().timestamp().required()
    .messages({
      ...errorMessages,
    }),
  Duration: Joi.number().integer().min(1).required()
    .messages({
      ...errorMessages,
    }),
  ArchiveLink: Joi.string().uri().allow(null, '')
    .messages({
      ...errorMessages,
    }),
  StartTime: Joi.date().timestamp().allow(null)
    .messages({
      ...errorMessages,
    }),
  EndTime: Joi.date().timestamp().allow(null)
    .messages({
      ...errorMessages,
    }),
  ArchiveURL: Joi.string().uri().allow(null, '')
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  vchatValidationSchema,
};
