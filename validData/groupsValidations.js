const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const groupsValidationSchema = Joi.object({
  GroupName: Joi.string().required().messages(errorMessages),
  Description: Joi.string().required().messages(errorMessages),
  Members: Joi.array().items(Joi.string()).required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  groupsValidationSchema,
};
