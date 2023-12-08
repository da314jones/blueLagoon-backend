const Joi = require('joi');

const vthreadsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    VideoURL: Joi.string().uri().required(),
    Title: Joi.string().max(255).required(),
    Category: Joi.string().max(100).required(),
    CreationDate: Joi.date().iso().required()
  });

  
  module.exports = {
    vthreadsValidationSchema
  }