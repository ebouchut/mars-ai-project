
import type { Request, Response, NextFunction } from 'express';
import type { ObjectSchema } from 'joi';

/**
 * Express middleware factory that validates `req.body` against a {@link https://joi.dev|Joi} schema.
 * Calls `next()` if valid, or returns a `400` with the validation error message.
 *
 * @param schema - The Joi schema to validate against.
 */
export function validate(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({ message: error.details.map(d => d.message) });
            return;
        }
        next();
    };
}

