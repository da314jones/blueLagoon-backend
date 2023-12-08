const Joi = require('joi');

// Define the validation schema for user
const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  // Add more validation rules for other user fields
});

module.exports = {
  userValidationSchema,
};
