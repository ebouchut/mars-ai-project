import Joi from 'joi';

/**
 * Joi Schema that defines how to validate the fields of the login form
 * See: https://joi.dev/api
 */
export const loginValidationSchema = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().required()
});