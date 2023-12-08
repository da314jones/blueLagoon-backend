const Joi = require('joi');

const vThreadSchema = Joi.object({
    is: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    VideoURL: Joi.string().uri().required(),

    title: Joi.string().min(3).max(100).required()
        .message({
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must be less than 100 characters long',
            'any.require': 'category ia required'
        }),
    category: Joi.string().min(3).max(50).required()
        .message({
            'string.min': 'Ctegory must be at least  3 characters long',
            'string.max': 'Category must be at less than  50 characters long',
        'any.required': 'Category is required'
        }), 
    CreationDate:  Joi.date().iso().required()
});


module.exports = {
    vThreadSchema
}