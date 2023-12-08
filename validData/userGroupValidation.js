const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const userGroupSchema = Joi.object({
  group_id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  role: Joi.string().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  userGroupSchema,
};
