import prisma             from '@/config/prisma.js';

import { verifyPassword } from '@/common/utils/hash.js';
import { generateJwt }    from './auth.jwt.service.js';

/**
 * Authenticates a user by email and password.
 * Verifies the password against the stored hash and returns a signed JWT on success.
 *
 * @param email    - The user's email address.
 * @param password - The plaintext password to verify.
 * @returns An object containing a signed JWT.
 * @throws {Error} If the user is not found or the password is incorrect.
 */
export async function login(email: string, password: string): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
        throw new Error('Invalid credentials');
    }

    const token = generateJwt(user);

    return { token };
}