const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'number.min': '"{{#label}}" must be at least {{#limit}}',
  'number.max': '"{{#label}}" must be less than or equal to {{#limit}}',
  'string.base': '"{{#label}}" must be text',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.min': '"{{#label}}" should have a minimum length of {{#limit}}',
  'string.max': '"{{#label}}" should have a maximum length of {{#limit}}',
  'string.email': '"{{#label}}" must be a valid email',
  'string.uri': '"{{#label}}" must be a valid URI',
  'string.alphanum': '"{{#label}}" should only contain alpha-numeric characters',
  'boolean.base': '"{{#label}}" must be a boolean (true or false)',
  'date.base': '"{{#label}}" should be a valid date',
  'date.format': '"{{#label}}" should have the format YYYY-MM-DD',
  'array.base': '"{{#label}}" must be an array',
  'any.required': '"{{#label}}" is a required field',
  'any.allowOnly': '"{{#label}}" must be one of {{#valids}}',
  'object.base': '"{{#label}}" must be an object'
};


const userValidationSchema = Joi.object({
  id: Joi.number().integer().messages(errorMessages),
  email: Joi.string().email().required().messages(errorMessages),
  hashed_password: Joi.string().required().messages(errorMessages),
  date_of_birth: Joi.date().required().messages(errorMessages),
  is_age_verified: Joi.boolean().messages(errorMessages),
  account_status: Joi.string().messages(errorMessages),
  phone_number: Joi.string().length(15).messages(errorMessages),
  profile_pic: Joi.string().uri().messages(errorMessages),
  interests: Joi.string().messages(errorMessages),
  challenges: Joi.string().messages(errorMessages),
  experiences: Joi.string().messages(errorMessages),
  locations: Joi.string().messages(errorMessages),
  join_date: Joi.date().required().messages(errorMessages),
  role: Joi.string().required().messages(errorMessages)
}).required();


module.exports = { userValidationSchema };
