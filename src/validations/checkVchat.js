const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'number.min': '"{{#label}}" must be greater than or equal to {{#limit}}',
  'string.base': '"{{#label}}" must be a string',
  'string.uri': '"{{#label}}" must be a valid URI',
  'string.empty': '"{{#label}}" cannot be empty',
  'date.base': '"{{#label}}" must be a valid date',
  'date.isoDate': '"{{#label}}" must be in ISO date format',
  'any.required': '"{{#label}}" is a required field',
};

const vchatValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  VideoURL: Joi.string().uri().required().messages(errorMessages),
  ScheduleTime: Joi.date().iso().required().messages(errorMessages),
  Duration: Joi.number().integer().min(0).required().messages(errorMessages),
  ArchiveLink: Joi.string().uri().allow('').messages(errorMessages),
  StartTime: Joi.date().iso().required().messages(errorMessages),
  EndTime: Joi.date().iso().required().messages(errorMessages),
  ArchiveURL: Joi.string().uri().allow('').messages(errorMessages)
});

module.exports = { vchatValidationSchema };
