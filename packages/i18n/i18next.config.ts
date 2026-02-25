// packages/i18n/i18next.config.ts
import { defineConfig } from 'i18next-cli';

export default defineConfig({
    locales: ['fr', 'en'],
    extract: {
        input: [
            '../frontend/src/**/*.{ts,tsx}',
            '../backend/src/**/*.ts',
        ],
        output: 'locales/{{language}}/{{namespace}}.json',
    },
});