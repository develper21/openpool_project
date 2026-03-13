import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { successResponse } from '../../utils/response';
import { AuthenticatedRequest } from '../../types';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      successResponse(res, result, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      successResponse(res, result, 'Login successful', 200);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      successResponse(res, result, 'Token refreshed successfully', 200);
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      // User is already attached by the auth middleware
      successResponse(res, { user: req.user }, 'User details retrieved', 200);
    } catch (error) {
      next(error);
    }
  }

  static async regenerateApiKey(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await AuthService.regenerateApiKey(userId);
      successResponse(res, result, 'API key regenerated successfully', 200);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // If tokens are stored in cookies, clear them here.
      // Since this is a JSON API, standard behavior is for the client to drop the tokens.
      successResponse(res, null, 'Logged out successfully. Please remove tokens on client side.', 200);
    } catch (error) {
      next(error);
    }
  }
}
