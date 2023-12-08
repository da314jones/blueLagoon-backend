const Joi = require('joi');

const recommendationsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    Title: Joi.string().max(255).required(),
    Description: Joi.string().required(),
    Link: Joi.string().uri().required(),
    recommendedOn: Joi.date().timestamp().required()
  });

  

module.exports = {
    recommendationsValidationSchema 
}