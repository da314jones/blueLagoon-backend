// userRegistrationSchemaValidation.js

const Joi = require('joi');

// Define the validation schema for user registration
const userRegistrationSchema = Joi.object({
  role: Joi.string().required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().required(),
  // Add more validation rules for other fields
});

module.exports = {
  userRegistrationSchema,
};
