"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLog = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
const auditLog = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const action = `${req.method} ${req.route?.path || req.path}`;
        const resource = req.baseUrl || req.path;
        // Fire and forget, do not await to prevent blocking the response
        database_1.prisma.auditLog.create({
            data: {
                userId: req.user?.id || null,
                action,
                resource,
                ipAddress: req.ip || req.socket.remoteAddress || null,
                userAgent: req.get('user-agent') || null,
                statusCode: res.statusCode,
                duration,
            }
        }).catch((err) => {
            logger_1.logger.error(`Error saving audit log: ${err.message}`, { error: err });
        });
    });
    next();
};
exports.auditLog = auditLog;
