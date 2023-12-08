const Joi = require('joi');

const errorMessages = {
  // Define your error messages here...
};

const reviewsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  product: Joi.string().required().messages(errorMessages),
  rating: Joi.number().integer().min(1).max(5).required().messages(errorMessages),
  reviewText: Joi.string().required().messages(errorMessages),
  reviewer: Joi.string().required().messages(errorMessages),
  // Add more validation rules for other fields...
});

module.exports = {
  reviewsValidationSchema,
};
