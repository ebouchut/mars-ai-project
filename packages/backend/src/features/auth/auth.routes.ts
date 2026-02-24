import { Router }                from 'express';

import { validate }              from '@/common/middlewares/validate.middleware.js';
import { loginValidationSchema } from './auth.validation.js';
import { loginController }       from './auth.controller.js';

const router = Router();

// POST /login
// The order matters: Validate login form first, then calls loginController
router.post('/login', validate(loginValidationSchema), loginController);

export default router;
