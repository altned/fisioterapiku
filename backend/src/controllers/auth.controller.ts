import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponseUtil } from '../utils/response';
import { AuthRequest } from '../types';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      return ApiResponseUtil.success(res, 'Registration successful', result, 201);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Registration failed', error.message, 400);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      return ApiResponseUtil.success(res, 'Login successful', result);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Login failed', error.message, 401);
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return ApiResponseUtil.error(res, 'Refresh token required', undefined, 400);
      }

      const result = await AuthService.refreshToken(refreshToken);
      return ApiResponseUtil.success(res, 'Token refreshed successfully', result);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Token refresh failed', error.message, 401);
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const profile = await AuthService.getProfile(req.user.id);
      return ApiResponseUtil.success(res, 'Profile retrieved successfully', profile);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get profile', error.message, 404);
    }
  }
}
