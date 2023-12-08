const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const userConnectionsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  connectionType: Joi.string().required().messages(errorMessages),
  user1: Joi.string().required().messages(errorMessages),
  user2: Joi.string().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  userConnectionsValidationSchema,
};
