import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '@/common/utils/hash.js';

/**
 * Sample test to verify Vitest setup and password hashing utilities.
 *
 * Learn more:
 * - Vitest API: https://vitest.dev/api/
 * - Testing async code: https://vitest.dev/guide/features.html#async-matchers
 * - expect matchers: https://vitest.dev/api/expect.html
 */
describe('Password Hashing', () => {
  it('should hash a password', async () => {
    const password = 'test123';
    const hash = await hashPassword(password);

    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe(password); // Hash should be different from plain text
  });

  it('should verify a correct password', async () => {
    const password = 'test123';
    const hash = await hashPassword(password);
    const isValid = await verifyPassword(password, hash);

    expect(isValid).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const password = 'test123';
    const wrongPassword = 'wrong';
    const hash = await hashPassword(password);
    const isValid = await verifyPassword(wrongPassword, hash);

    expect(isValid).toBe(false);
  });

  it('should produce different hashes for the same password', async () => {
    const password = 'test123';
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    // Each hash should be unique due to random salt
    expect(hash1).not.toBe(hash2);

    // But both should verify correctly
    expect(await verifyPassword(password, hash1)).toBe(true);
    expect(await verifyPassword(password, hash2)).toBe(true);
  });
});
