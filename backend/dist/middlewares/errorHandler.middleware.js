"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, _req, res, _next) => {
    console.error('Error:', err);
    if (err.name === 'ValidationError') {
        response_1.ApiResponseUtil.error(res, 'Validation error', err.message, 400);
        return;
    }
    if (err.name === 'UnauthorizedError') {
        response_1.ApiResponseUtil.error(res, 'Unauthorized', err.message, 401);
        return;
    }
    response_1.ApiResponseUtil.error(res, 'Internal server error', process.env.NODE_ENV === 'development' ? err.message : undefined, 500);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res) => {
    response_1.ApiResponseUtil.error(res, 'Route not found', undefined, 404);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.middleware.js.map