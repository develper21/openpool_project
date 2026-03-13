"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const env_1 = require("../config/env");
const { combine, timestamp, json, printf, colorize } = winston_1.default.format;
// Custom format for local development
const customDevFormat = printf((info) => {
    const { level, message, timestamp, stack } = info;
    return `${timestamp} ${level}: ${stack || message}`;
});
exports.logger = winston_1.default.createLogger({
    level: env_1.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), env_1.env.NODE_ENV === 'production' ? json() : customDevFormat),
    transports: [
        new winston_1.default.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: json()
        }),
        new winston_1.default.transports.File({
            filename: 'logs/combined.log',
            format: json()
        }),
    ],
});
// If not in production, log to console with colors
if (env_1.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.default.transports.Console({
        format: combine(colorize({ all: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customDevFormat),
    }));
}
exports.default = exports.logger;
