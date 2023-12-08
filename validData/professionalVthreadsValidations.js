const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const professionalVthreadsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  subject: Joi.string().required().messages(errorMessages),
  messages: Joi.array().items(
    Joi.object({
      author: Joi.string().required().messages(errorMessages),
      message: Joi.string().required().messages(errorMessages),
      timestamp: Joi.date().iso().required().messages(errorMessages),
    })
  ).required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  professionalVthreadsValidationSchema,
};
