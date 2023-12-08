const Joi = require('joi');

// Define the validation schema for vchat
const vchatValidationSchema = Joi.object({
  topic: Joi.string().required(),
  participants: Joi.array().items(Joi.string()).min(2).required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
  // Add more validation rules for other vchat fields
});

module.exports = {
  vchatValidationSchema,
};
