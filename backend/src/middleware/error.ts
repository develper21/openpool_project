import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 1. AppError (Operational)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // 2. Prisma Errors
  if (err.code === 'P2002') {
    res.status(409).json({ success: false, error: 'Resource already exists' });
    return;
  }
  
  if (err.code === 'P2025') {
    res.status(404).json({ success: false, error: 'Resource not found' });
    return;
  }

  // 3. JWT Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
    return;
  }

  // 4. Multer Errors
  if (err.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE') {
    res.status(400).json({ success: false, error: 'File too large' });
    return;
  }

  // 5. Unhandled / Server Errors
  logger.error(`[Unhandled Error] ${err.message}`, { stack: err.stack, url: req.originalUrl, method: req.method });
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
