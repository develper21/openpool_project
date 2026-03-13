"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const database_1 = require("../config/database");
const env_1 = require("../config/env");
const authMiddleware = async (req, res, next) => {
    try {
        let user;
        const authHeader = req.headers.authorization;
        const apiKeyHeader = req.headers['x-api-key'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            user = await database_1.prisma.user.findUnique({
                where: { id: decoded.userId }
            });
        }
        else if (apiKeyHeader) {
            user = await database_1.prisma.user.findUnique({
                where: { apiKey: apiKeyHeader }
            });
        }
        if (!user || !user.isActive) {
            next(new error_1.AppError('Unauthorized', 401));
            return;
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            apiKey: user.apiKey,
        };
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            next(new error_1.AppError('Invalid or expired token', 401));
            return;
        }
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
