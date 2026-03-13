"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const logger_1 = require("../utils/logger");
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
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
    logger_1.logger.error(`[Unhandled Error] ${err.message}`, { stack: err.stack, url: req.originalUrl, method: req.method });
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;
