"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../config/database");
const env_1 = require("../../config/env");
const error_1 = require("../../middleware/error");
const apiKey_1 = require("../../utils/apiKey");
class AuthService {
    static async generateTokenPair(userId, email, role) {
        const accessToken = jsonwebtoken_1.default.sign({ userId, email, role }, env_1.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, env_1.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
    static async register(data) {
        const existingUser = await database_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new error_1.AppError('Email already in use', 409);
        }
        const passwordHash = await bcryptjs_1.default.hash(data.password, 12);
        const apiKey = (0, apiKey_1.generateApiKey)();
        const user = await database_1.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                passwordHash,
                apiKey,
            },
        });
        const tokens = await this.generateTokenPair(user.id, user.email, user.role);
        const { passwordHash: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            ...tokens,
        };
    }
    static async login(data) {
        const user = await database_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new error_1.AppError('Invalid email or password', 401);
        }
        const isMatch = await bcryptjs_1.default.compare(data.password, user.passwordHash);
        if (!isMatch) {
            throw new error_1.AppError('Invalid email or password', 401);
        }
        if (!user.isActive) {
            throw new error_1.AppError('Account is deactivated', 403);
        }
        const tokens = await this.generateTokenPair(user.id, user.email, user.role);
        const { passwordHash: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            ...tokens,
        };
    }
    static async refreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_REFRESH_SECRET);
            const user = await database_1.prisma.user.findUnique({
                where: { id: decoded.userId },
            });
            if (!user || !user.isActive) {
                throw new error_1.AppError('Invalid or expired refresh token', 401);
            }
            const tokens = await this.generateTokenPair(user.id, user.email, user.role);
            return tokens;
        }
        catch (error) {
            throw new error_1.AppError('Invalid or expired refresh token', 401);
        }
    }
    static async regenerateApiKey(userId) {
        const newApiKey = (0, apiKey_1.generateApiKey)();
        const user = await database_1.prisma.user.update({
            where: { id: userId },
            data: { apiKey: newApiKey },
        });
        return { apiKey: user.apiKey };
    }
}
exports.AuthService = AuthService;
