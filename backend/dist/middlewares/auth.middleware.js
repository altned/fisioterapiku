"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            response_1.ApiResponseUtil.error(res, 'No token provided', undefined, 401);
            return;
        }
        const token = authHeader.substring(7);
        const decoded = jwt_1.JwtUtil.verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        response_1.ApiResponseUtil.error(res, 'Invalid or expired token', undefined, 401);
        return;
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            return;
        }
        if (!roles.includes(req.user.role)) {
            response_1.ApiResponseUtil.error(res, 'You do not have permission to access this resource', undefined, 403);
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map