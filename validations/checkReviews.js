const Joi = require('joi');

const reviewsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    EventOrServiceId: Joi.number().integer().required(),
    Rating: Joi.number().integer().min(1).max(5).required(),
    Comment: Joi.string().required(),
    ReviewDate: Joi.date().timestamp().required()
  });
  

  module.exports = {
    reviewsValidationSchema
  }