import { describe, it, expect } from 'vitest';
import { UserRole, FilmStatus } from '../src/generated/prisma/client.js';

/**
 * Sample test to verify Vitest setup and Prisma enum exports.
 *
 * Learn more:
 * - Vitest API: https://vitest.dev/api/
 * - expect matchers: https://vitest.dev/api/expect.html
 */
describe('Prisma Enums', () => {
  it('should export UserRole enum', () => {
    expect(UserRole).toBeDefined();
    expect(UserRole.admin).toBe('admin');
    expect(UserRole.filmmaker).toBe('filmmaker');
    expect(UserRole.screener).toBe('screener');
    expect(UserRole.jury).toBe('jury');
  });

  it('should export FilmStatus enum', () => {
    expect(FilmStatus).toBeDefined();
    expect(FilmStatus.submitted).toBe('submitted');
    expect(FilmStatus.bookended).toBe('bookended');
    expect(FilmStatus.draft_published).toBe('draft_published');
    expect(FilmStatus.copyright_cleared).toBe('copyright_cleared');
    expect(FilmStatus.copyright_flagged).toBe('copyright_flagged');
  });
});
