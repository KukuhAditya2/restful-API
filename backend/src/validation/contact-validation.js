import Joi from "joi";

const scemaCreateContacts = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).optional(),
    phone: Joi.string().max(20).optional()
});

const scemaGetContact = Joi.number().positive().required();

const scemaUpdateContacts = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).optional(),
    phone: Joi.string().max(20).optional()
});

const scemaSearch = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    sizeTake: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
});

export {
    scemaCreateContacts,
    scemaGetContact,
    scemaUpdateContacts,
    scemaSearch
}