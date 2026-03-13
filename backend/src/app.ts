import express, { Express, Request, Response, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: env.ALLOWED_ORIGINS }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './modules/auth/auth.routes';
import { globalLimiter, authLimiter, summarizeLimiter } from './middleware/rateLimit';

// Base router mounted at /api/v1
const v1Router = Router();

// Apply global limiter to all v1 routes
v1Router.use(globalLimiter);

v1Router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// Stricter limiter for authentication routes
v1Router.use('/auth/login', authLimiter);
v1Router.use('/auth/register', authLimiter);
v1Router.use('/auth', authRoutes);

import papersRoutes from './modules/papers/papers.routes';
v1Router.use('/papers', papersRoutes);

// Rate limiter for expensive AI routes
v1Router.use('/summaries/generate', summarizeLimiter);


app.use('/api/v1', v1Router);


export default app;
