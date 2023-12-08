const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const professionalVchatsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  title: Joi.string().required().messages(errorMessages),
  description: Joi.string().required().messages(errorMessages),
  date: Joi.date().iso().required().messages(errorMessages),
  attendees: Joi.array().items(Joi.string()).required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  professionalVchatsValidationSchema,
};
