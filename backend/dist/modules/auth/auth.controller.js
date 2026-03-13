"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const response_1 = require("../../utils/response");
class AuthController {
    static async register(req, res, next) {
        try {
            const result = await auth_service_1.AuthService.register(req.body);
            (0, response_1.successResponse)(res, result, 'User registered successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const result = await auth_service_1.AuthService.login(req.body);
            (0, response_1.successResponse)(res, result, 'Login successful', 200);
        }
        catch (error) {
            next(error);
        }
    }
    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await auth_service_1.AuthService.refreshToken(refreshToken);
            (0, response_1.successResponse)(res, result, 'Token refreshed successfully', 200);
        }
        catch (error) {
            next(error);
        }
    }
    static async getMe(req, res, next) {
        try {
            // User is already attached by the auth middleware
            (0, response_1.successResponse)(res, { user: req.user }, 'User details retrieved', 200);
        }
        catch (error) {
            next(error);
        }
    }
    static async regenerateApiKey(req, res, next) {
        try {
            const userId = req.user.id;
            const result = await auth_service_1.AuthService.regenerateApiKey(userId);
            (0, response_1.successResponse)(res, result, 'API key regenerated successfully', 200);
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
            // If tokens are stored in cookies, clear them here.
            // Since this is a JSON API, standard behavior is for the client to drop the tokens.
            (0, response_1.successResponse)(res, null, 'Logged out successfully. Please remove tokens on client side.', 200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
