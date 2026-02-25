import type {Request, Response } from 'express';
import { login } from './auth.service.js';

/**
 * Handles user login requests.
 * Validates credentials and returns a JWT on success.
 *
 * @param req - Express request. Expects `email` and `password` in `req.body`.
 * @param res - Express response. Returns `{ token }` on success, or `401` on failure.
 */
export async function loginController(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: req.t('auth:invalid_credentials') });
    }
}