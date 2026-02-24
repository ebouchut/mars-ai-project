import prisma from '@/config/prisma.js';

import { verifyPassword } from '@/common/utils/hash.js';
import { generateJwt } from './auth.jwt.service.js';

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