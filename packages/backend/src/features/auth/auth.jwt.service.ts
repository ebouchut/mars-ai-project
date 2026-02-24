import "dotenv/config";
import jwt, {type JwtPayload} from 'jsonwebtoken';
import type { StringValue } from 'ms';

import type { User } from "@marsai/database";
import { requireEnv } from '@/config/environment.js';

const JWT_SECRET     = requireEnv("JWT_SECRET");
const JWT_EXPIRES_IN = requireEnv("JWT_EXPIRES_IN");
const JWT_ISSUER     = requireEnv("JWT_ISSUER");

/**
 * Generates a signed JWT for the given user.
 *
 * @param user - The authenticated user whose `uuid` and `role` are embedded in the token payload.
 * @returns A signed JWT string.
 */
export function generateJwt(user: User): string {
    const payload = {
        sub:  user.uuid,
        role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN as StringValue,
        issuer:    JWT_ISSUER
    });
}

/**
 * Verifies a JWT and returns its decoded payload.
 *
 * @param token - The JWT string to verify.
 * @returns The decoded `JwtPayload` if the token is valid.
 * @throws {Error} If the token is invalid, the signature does not match, or the token has expired.
 */
export function verifyJwt(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET, {
        issuer: JWT_ISSUER,
    }) as JwtPayload;
}