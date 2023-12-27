const Joi = require('joi');

// Define validation schema for password
const passwordSchema = Joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

// Validate a password
function validatePassword(password) {
  return passwordSchema.validate(password);
}

module.exports = {
  validatePassword,
};
