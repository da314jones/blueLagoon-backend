const Joi = require('joi');

const errorMessages = {
  // Same error messages as in userConnectionsValidationSchema.js
};

const userGroupsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  group_id: Joi.number().integer().required().messages(errorMessages),
  JoinDate: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { userGroupsValidationSchema };
