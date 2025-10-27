"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
class AuthController {
    static async register(req, res) {
        try {
            const result = await auth_service_1.AuthService.register(req.body);
            return response_1.ApiResponseUtil.success(res, 'Registration successful', result, 201);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Registration failed', error.message, 400);
        }
    }
    static async login(req, res) {
        try {
            const result = await auth_service_1.AuthService.login(req.body);
            return response_1.ApiResponseUtil.success(res, 'Login successful', result);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Login failed', error.message, 401);
        }
    }
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return response_1.ApiResponseUtil.error(res, 'Refresh token required', undefined, 400);
            }
            const result = await auth_service_1.AuthService.refreshToken(refreshToken);
            return response_1.ApiResponseUtil.success(res, 'Token refreshed successfully', result);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Token refresh failed', error.message, 401);
        }
    }
    static async getProfile(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const profile = await auth_service_1.AuthService.getProfile(req.user.id);
            return response_1.ApiResponseUtil.success(res, 'Profile retrieved successfully', profile);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get profile', error.message, 404);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map