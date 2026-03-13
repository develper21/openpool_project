import { Router } from 'express';
import { AuthController } from './auth.controller';
import { registerSchema, loginSchema, refreshSchema } from './auth.schema';
import { validate, authMiddleware, trackApiUsage } from '../../middleware';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/refresh', validate(refreshSchema), AuthController.refresh);

// Protected routes
router.use(authMiddleware as any);
router.use(trackApiUsage);


router.get('/me', AuthController.getMe as any);
router.post('/regenerate-api-key', AuthController.regenerateApiKey as any);
router.post('/logout', AuthController.logout);

export default router;
