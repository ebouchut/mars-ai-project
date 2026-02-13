import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Node environment (no DOM needed for database package)
    environment: 'node',

    // Test file patterns
    include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/generated/**'],
    },
  },
});
