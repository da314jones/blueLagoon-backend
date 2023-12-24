const Joi = require('joi');

const errorMessages = {
  // Same error messages as in userConsentLogsValidationSchema.js
};

const userConsentLogsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  group_id: Joi.number().integer().required().messages(errorMessages),
  JoinDate: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { userConsentLogsValidationSchema };
