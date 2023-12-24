const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be text',
    'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
    'any.required': '"{{#label}}" is a required field'
};

const emergencyContactsValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages(errorMessages),
    user_id: Joi.number().integer().required().messages(errorMessages),
    Name: Joi.string().max(255).required().messages(errorMessages),
    ContactInfo: Joi.string().required().messages(errorMessages),
    Description: Joi.string().required().messages(errorMessages),
    Location: Joi.string().max(255).required().messages(errorMessages)
});

const validateEmergencyContact = (req, res, next) => {
  const { error } = emergencyContactsValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  emergencyContactsValidationSchema,
  validateEmergencyContact
};
