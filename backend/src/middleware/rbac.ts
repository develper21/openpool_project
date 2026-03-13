import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, Role } from '../types';
import { AppError } from './error';

export const requireRole = (...roles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role as Role)) {
      next(new AppError('Forbidden: Insufficient privileges', 403));
      return;
    }
    next();
  };
};
