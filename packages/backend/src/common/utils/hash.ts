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

// -------------------------------------------------------
// Hash a password
// Returns a string "salt:hash" (both hex-encoded)
// -------------------------------------------------------
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

// -------------------------------------------------------
// Verify a password against a stored hash
// Uses constant-time comparison to prevent timing attacks
// -------------------------------------------------------
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