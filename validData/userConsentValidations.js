const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const userConsentLogsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  consentType: Joi.string().required().messages(errorMessages),
  user: Joi.string().required().messages(errorMessages),
  agreed: Joi.boolean().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  userConsentLogsValidationSchema,
};
