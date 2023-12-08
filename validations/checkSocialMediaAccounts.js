const Joi = require('joi');

const socialMediaAccountsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    SocialMediaPlatform: Joi.string().max(50).required(),
    SocialMediaID: Joi.string().max(255).required(),
    ProfileURL: Joi.string().uri().required(),
    ConnectedOn: Joi.date().timestamp().required()
  });

  
  module.exports = {
    socialMediaAccountsValidationSchema
  }