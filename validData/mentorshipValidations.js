const Joi = require('joi');

const errorMessage = {
  // Define your error messages here...
};

const mentorsValidationSchema = Joi.object({
  mentor_id: Joi.string().required().messages(errorMessage),
  mentee_id: Joi.string().required().messages(errorMessage),
  start_date: Joi.date().iso().required().messages(errorMessage),
  end_date: Joi.date().iso().required().messages(errorMessage),
  description: Joi.string().required().messages(errorMessage),
  // Add more validation rules for other fields...
});

module.exports = {
  mentorsValidationSchema,
};
