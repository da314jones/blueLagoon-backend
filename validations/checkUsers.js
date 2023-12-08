const Joi = require('joi');

const registerSchema = Joi.object({
    role: Joi.string().alphanumeric().min(3).max(50)
        .messages({
            'string.alphanumeric': 'Role should only contain alphanumeric characters',
            'string.min': 'Role should have at least {#limit} characters',
            'string.max': 'Role should not exceed {#limit} characters'
        }),
    Email: Joi.string().email().required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
    Password: Joi.string().min(6).required()
        .messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        }),
    ProfilePic: Joi.string().min(6).max(255)
        .message({
            'string.uri': 'Profile picture URL is not valid',
            'string.max': 'Profile picture URL should not exceed {#limit} characters'
        }),
    Interests: Joi.string().max(500)
        .message({
            'string.max': 'Interests should not exceed {#limit} characters'
        }),
    Challenges: Joi.string().max(500)
        .message({
            'string.max': 'Challenges should not exceed {#limit} characters'
        }),
    Experiences: Joi.string().max(500)
        .message({
            'string.max': 'Experiences should not exceed {#limit} characters'
        }),
    Locations: Joi.string().max(100)
        .message({
            'string.max': 'Location should not exceed {#limit} characters'
        }),
    JoinDate: Joi.date(),
    name: Joi.string().alphanumeric().min(3).max(30).required()
        .messages({
            'string.alphanumeric': 'Name must contain only alphanumeric characters',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than 30 characters long',
            'any.required': 'Name is required'
        }),
});

module.exports = { 
    registerSchema
};
