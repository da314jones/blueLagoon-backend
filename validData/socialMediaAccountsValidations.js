const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const socialMediaAccountsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  platform: Joi.string().required().messages(errorMessages),
  handle: Joi.string().required().messages(errorMessages),
  followerCount: Joi.number().integer().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  socialMediaAccountsValidationSchema,
};
