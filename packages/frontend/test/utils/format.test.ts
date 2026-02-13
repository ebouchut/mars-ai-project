import { describe, it, expect } from 'vitest';
import { formatDuration, truncate } from '../../src/utils/format.js';

/**
 * Sample test to verify Vitest setup for frontend utilities.
 *
 * Learn more:
 * - Vitest API: https://vitest.dev/api/
 * - Environment setup: https://vitest.dev/guide/environment.html
 * - Testing React: https://vitest.dev/guide/ui.html#testing-react
 */
describe('formatDuration', () => {
  it('should format seconds to MM:SS', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(30)).toBe('0:30');
    expect(formatDuration(60)).toBe('1:00');
    expect(formatDuration(90)).toBe('1:30');
  });

  it('should pad single-digit seconds with zero', () => {
    expect(formatDuration(65)).toBe('1:05');
    expect(formatDuration(125)).toBe('2:05');
  });
});

describe('truncate', () => {
  it('should not truncate text shorter than maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Short', 5)).toBe('Short');
  });

  it('should truncate text longer than maxLength with ellipsis', () => {
    expect(truncate('This is a long text', 10)).toBe('This is...');
    expect(truncate('1-minute AI film', 10)).toBe('1-minut...');
  });

  it('should handle edge case where text equals maxLength', () => {
    expect(truncate('Exactly', 7)).toBe('Exactly');
  });
});
