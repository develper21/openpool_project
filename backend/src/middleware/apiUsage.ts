import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AppError } from './error';

export const trackApiUsage = async (req: Request, res: Response, next: NextFunction) => {
  // Assuming req.user is populated by authMiddleware
  const user = (req as any).user;

  if (!user || !user.id) {
    return next();
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { apiCallsCount: true, apiCallsLimit: true },
    });

    if (!dbUser) {
      return next(new AppError('User not found', 404));
    }

    if (dbUser.apiCallsCount >= dbUser.apiCallsLimit) {
      return next(new AppError('API call limit reached. Contact admin to increase limit.', 429));
    }

    // Increment apiCallsCount
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { apiCallsCount: { increment: 1 } },
    });

    // Add headers to response
    res.setHeader('X-RateLimit-Limit', dbUser.apiCallsLimit.toString());
    res.setHeader('X-RateLimit-Remaining', (dbUser.apiCallsLimit - updatedUser.apiCallsCount).toString());

    next();
  } catch (error) {
    next(error);
  }
};
