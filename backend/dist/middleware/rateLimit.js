"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeLimiter = exports.authLimiter = exports.globalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: {
        success: false,
        error: 'Too many requests, please try again later',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        error: 'Too many authentication attempts',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.summarizeLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: {
        success: false,
        error: 'Too many summary requests, please wait a minute',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
