import express, { type Express } from 'express';
import { initI18n }              from './i18n.js';
import { loadRoutes }            from './routes.js';

/**
 * Creates and configures the Express application.
 * Initializes i18n, registers JSON body parsing, and mounts all routes.
 *
 * @returns The configured Express application instance.
 */
export async function loadExpress(): Promise<Express> {
    const app = express();

    // Initialize i18next and attach req.t() to every request
    app.use(await initI18n());

    // IMPORTANT: express.json() must come before loadRoutes()
    // parse req.body as JSON — required before routes
    app.use(express.json());

    loadRoutes(app);

    return app;
}
