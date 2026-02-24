import express, { type Express } from 'express';
import          { loadRoutes }   from './routes.js';

/**
 * Creates and configures the Express application.
 * Registers JSON body parsing and all application routes.
 *
 * @returns The configured Express application instance.
 */
export function loadExpress(): Express {
    const app = express();

    // IMPORTANT: app.use() must come before loadRoutes()
    // parse req.body as JSON — required before routes
    app.use(express.json());

    loadRoutes(app);

    return app;
}
