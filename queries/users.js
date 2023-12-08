const Joi = require('joi');

const registerSchema = Joi.object({
    role: Joi.string().alphanum().min(3).max(50)
        .message({
            'string.alphanumeric': 'Role should only contain alphanumeric characters',
            'string.min': 'Role should have at least {#limit} characters',
            'string.max': 'Role should not exceed {#limit} characters'
        }),
    Email: Joi.string().email().required()
        .message({
            'string.email':'Invalid emil format',
            'any.required': 'Email is required'
        }),
    Password: Joi.string().min(6).required()
        .message({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        }),
    ProfilePic: Joi.string().uri().min(6).max(255)
        .message({
            'string.url.': 'Profile picture URL is not valid',
            'string.max': 'Profile picture URL should not exceed {#limit} characters'
        }),
    Interests: Joi.string().max(500)
        .message({
            'string.max': 'Interests should not exceed {#limit} characters'
        }),
        Challenges: Joi.string().max(500)
            .message({
                'string.max': 'Challenges should not exceed the {#limit} characters'
            }),
        Experiences: Joi.string().max(500)
            .message({
                'string.max': 'Experiences should not exceed the {#limit} characters'
            }),
        Locations: Joi().max(100)
            .message({
                'string.max': 'Location should not exceed the {#limit} characters'
            }),
        JoinDate: Joi.date(),
        name: Joi.string().alphanum().min(3).max(30).required()
            .message({
                'string.alphanumeric': 'Name must contain only alphanumeric characters',
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),
});


module.exports = { 
    registerSchema
};