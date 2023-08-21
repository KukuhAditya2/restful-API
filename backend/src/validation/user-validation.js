import Joi from "joi";

const scemaUser = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).min(8).label('password').required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
        'any.only': '{{#label}} should match the password',
        'any.required': '{{#label}} is required',
    }),
    name: Joi.string().max(100).required()
});

const scemaLogin = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).min(8).label('password').required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
        'any.only': '{{#label}} should match the password',
        'any.required': '{{#label}} is required',
    })
});

const scemaGetUser = Joi.string().max(100).required();

const scemaUpdate = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).min(8).label('password').optional(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).optional().label('Confirm Password').messages({
        'any.only': '{{#label}} should match the password',
        'any.required': '{{#label}} is required',
    }),
    name: Joi.string().max(100).optional()
});

export {
    scemaUser,
    scemaLogin,
    scemaGetUser,
    scemaUpdate
}