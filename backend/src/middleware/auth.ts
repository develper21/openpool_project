import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types';
import { AppError } from './error';
import { prisma } from '../config/database';
import { env } from '../config/env';

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let user;

    const authHeader = req.headers.authorization;
    const apiKeyHeader = req.headers['x-api-key'] as string;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string, email: string, role: string };
      
      user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      
    } else if (apiKeyHeader) {
      user = await prisma.user.findUnique({
        where: { apiKey: apiKeyHeader }
      });
    }

    if (!user || !user.isActive) {
      next(new AppError('Unauthorized', 401));
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      apiKey: user.apiKey,
    };


    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      next(new AppError('Invalid or expired token', 401));
      return;
    }
    next(error);
  }
};
