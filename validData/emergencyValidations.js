const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const emergencyValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  type: Joi.string().max(255).required().messages(errorMessages),
  location: Joi.string().required().messages(errorMessages),
  timestamp: Joi.date().iso().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  emergencyValidationSchema,
};
