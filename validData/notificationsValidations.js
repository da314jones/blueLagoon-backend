const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const notificationsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  type: Joi.string().required().messages(errorMessages),
  message: Joi.string().required().messages(errorMessages),
  recipient: Joi.string().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  notificationsValidationSchema,
};
