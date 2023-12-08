const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const affiliatesValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  name: Joi.string().max(255).required().messages(errorMessages),
  website: Joi.string().uri().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  affiliatesValidationSchema,
};
