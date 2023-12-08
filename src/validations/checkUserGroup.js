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

const userGroupSchema = Joi.object({
  // Define the validation rules for User Group here
});

module.exports = { 
  userGroupSchema
};
