import type { Express } from 'express';
import      authRouter  from '@/features/auth/auth.routes.js';

/**
 * Registers all application routers on the Express instance.
 *
 * @param app - The Express application instance to mount routes on.
 */
export function loadRoutes(app: Express): void {
    app.use('/auth', authRouter);
}
