const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const errorLogsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  message: Joi.string().required().messages(errorMessages),
  timestamp: Joi.date().iso().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  errorLogsValidationSchema,
};
