"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackApiUsage = void 0;
const database_1 = require("../config/database");
const error_1 = require("./error");
const trackApiUsage = async (req, res, next) => {
    // Assuming req.user is populated by authMiddleware
    const user = req.user;
    if (!user || !user.id) {
        return next();
    }
    try {
        const dbUser = await database_1.prisma.user.findUnique({
            where: { id: user.id },
            select: { apiCallsCount: true, apiCallsLimit: true },
        });
        if (!dbUser) {
            return next(new error_1.AppError('User not found', 404));
        }
        if (dbUser.apiCallsCount >= dbUser.apiCallsLimit) {
            return next(new error_1.AppError('API call limit reached. Contact admin to increase limit.', 429));
        }
        // Increment apiCallsCount
        const updatedUser = await database_1.prisma.user.update({
            where: { id: user.id },
            data: { apiCallsCount: { increment: 1 } },
        });
        // Add headers to response
        res.setHeader('X-RateLimit-Limit', dbUser.apiCallsLimit.toString());
        res.setHeader('X-RateLimit-Remaining', (dbUser.apiCallsLimit - updatedUser.apiCallsCount).toString());
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.trackApiUsage = trackApiUsage;
