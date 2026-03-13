import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';

export const auditLog = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const action = `${req.method} ${req.route?.path || req.path}`;
    const resource = req.baseUrl || req.path;

    // Fire and forget, do not await to prevent blocking the response
    prisma.auditLog.create({
      data: {
        userId: req.user?.id || null,
        action,
        resource,
        ipAddress: req.ip || req.socket.remoteAddress || null,
        userAgent: req.get('user-agent') || null,
        statusCode: res.statusCode,
        duration,
      }
    }).catch((err: Error) => {
      logger.error(`Error saving audit log: ${err.message}`, { error: err });
    });
  });

  next();
};
