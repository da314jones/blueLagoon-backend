const Joi = require('joi');

// Define centralized error messages for validation rules
const errorMessages = {
  'string.alphanumeric': '{{#label}} should only contain alphanumeric characters',
  'string.min': '{{#label}} should have at least {#limit} characters',
  'string.max': '{{#label}} should not exceed {#limit} characters',
  'string.email': 'Invalid email format',
  'string.uri': '{{#label}} is not a valid URI',
  'any.required': '{{#label}} is required',
};

const userRegisterSchema = Joi.object({
  role: Joi.string().alphanumeric().min(3).max(50).messages(errorMessages),
  Email: Joi.string().email().required().messages(errorMessages),
  Password: Joi.string().min(6).required().messages(errorMessages),
  ProfilePic: Joi.string().min(6).max(255).uri().messages(errorMessages),
  Interests: Joi.string().max(500).messages(errorMessages),
  Challenges: Joi.string().max(500).messages(errorMessages),
  Experiences: Joi.string().max(500).messages(errorMessages),
  Locations: Joi.string().max(100).messages(errorMessages),
  JoinDate: Joi.date(),
  name: Joi.string().alphanumeric().min(3).max(30).required().messages(errorMessages),
});

module.exports = {
  userRegisterSchema
};
