import i18next          from 'i18next';
import Backend          from 'i18next-fs-backend';
import * as middleware  from 'i18next-http-middleware';
import type { Handler } from 'express';


/**
 * Initializes the `i18next` instance with the filesystem backend
 * and HTTP language detection middleware.
 *
 * - The `fs-backend` plugin loads JSON locale files from disk
 * - The `http-middleware` plugin detects the language from the `Accept-Language` header
 * - The supported languages and fallback are configured here
 *
 * Must be called before the Express app starts handling requests.
 *
 * @returns An Express middleware that attaches `req.t()` to every request.
 */
export async function initI18n(): Promise<Handler> {
    await i18next
        .use(Backend)  // loads JSON locale files from disk
        .use(middleware.LanguageDetector) // detects the language from the `Accept-Language` header
        .init({
            // Languages the app supports
            supportedLngs: ['fr', 'en'],

            // Used when the requested language has no translation
            fallbackLng: 'fr',

            // Namespace that maps to a JSON file (e.g. locales/fr/common.json)
            defaultNS: 'common',

            backend: {
                // Path to locale files — points to the shared @marsai/i18n package
                loadPath: '../../i18n/locales/{{lng}}/{{ns}}.json',
            },
        });

    return middleware.handle(i18next);
}