import { argon2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This module provides 2 methods to hash and verify
// (a password) using the Argon2id algorithm.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Promisify the callback-based API for async/await usage
const argon2Async = promisify(argon2);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Using OWASP recommended Argon2id parameters
// See: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const ALGORITHM = "argon2id";
// 16 bytes = 128-bit salt
const SALT_LENGTH = 16;
const PARALLELISM = 1;
// 46 MiB
const MEMORY = 47104;
const PASSES = 1;
// 32 bytes = 256-bit hash
const TAG_LENGTH = 32;

/**
 * Hashes a password using the Argon2id algorithm with OWASP-recommended parameters.
 *
 * Argon2id is the hybrid variant of Argon2 (winner of the 2015 Password Hashing Competition).
 * It combines:
 * - **Argon2i** behaviour on the first pass (data-independent memory access),
 *   which resists side-channel attacks
 * - **Argon2d** behaviour on subsequent passes (data-dependent memory access),
 *   which resists GPU and ASIC brute-force attacks
 *
 * Configuration (per OWASP recommendations):
 * - **Salt:** 128-bit (16 bytes) random — prevents rainbow table attacks
 * - **Memory:** 46 MiB — makes parallel GPU cracking prohibitively expensive
 * - **Passes:** 1 — single iteration is sufficient at this memory cost
 * - **Parallelism:** 1 — single thread, safe for servers handling concurrent requests
 * - **Tag length:** 256-bit (32 bytes) — provides strong collision resistance
 *
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html | OWASP Password Storage Cheat Sheet}
 *
 * @param password - The plaintext password to hash.
 * @returns A string in the format `"salt:hash"` (both hex-encoded).
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH);

    const hash = await argon2Async(ALGORITHM, {
        message: password,
        nonce: salt,
        parallelism: PARALLELISM,
        memory: MEMORY,
        passes: PASSES,
        tagLength: TAG_LENGTH,
    });

    return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored `"salt:hash"` string.
 * Uses constant-time comparison to prevent timing attacks.
 *
 * @param password - The plaintext password to verify.
 * @param stored   - The stored `"salt:hash"` string produced by {@link hashPassword}.
 * @returns `true` if the password matches, `false` otherwise.
 */
export async function verifyPassword(
    password: string,
    stored: string,
): Promise<boolean> {
    const [saltHex, hashHex] = stored.split(":");
    if (!saltHex || !hashHex) return false;

    const salt = Buffer.from(saltHex, "hex");
    const storedHash = Buffer.from(hashHex, "hex");

    const hash = await argon2Async(ALGORITHM, {
        message: password,
        nonce: salt,
        parallelism: PARALLELISM,
        memory: MEMORY,
        passes: PASSES,
        tagLength: TAG_LENGTH,
    });

    return timingSafeEqual(hash, storedHash);
}