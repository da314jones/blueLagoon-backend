const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be a text',
    'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
    'any.required': '"{{#label}}" is a required field',
    'date.base': '"{{#label}}" must be a valid date',
    'object.base': '"{{#label}}" must be an object'
};

const errorLogsValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages(errorMessages),
    user_id: Joi.number().integer().allow(null).messages(errorMessages),
    error_type: Joi.string().max(50).required().messages(errorMessages),
    error_message: Joi.string().required().messages(errorMessages),
    error_time: Joi.date().iso().required().messages(errorMessages),
    additional_info: Joi.object().required().messages(errorMessages)
});

module.exports = {
  errorLogsValidationSchema,
};
