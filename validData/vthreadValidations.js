const Joi = require('joi');

// Define the validation schema for vthread
const vthreadValidationSchema = Joi.object({
  title: Joi.string().required(),
  threads: Joi.array().items(
    Joi.object({
      author: Joi.string().required(),
      content: Joi.string().required(),
      timestamp: Joi.date().iso().required(),
    })
  ).min(1).required(),
  // Add more validation rules for other vthread fields
});

module.exports = {
  vthreadValidationSchema,
};
