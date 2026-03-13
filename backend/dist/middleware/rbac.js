"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const error_1 = require("./error");
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            next(new error_1.AppError('Forbidden: Insufficient privileges', 403));
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
