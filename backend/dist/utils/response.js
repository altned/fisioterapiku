"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = exports.ApiResponseUtil = void 0;
class ApiResponseUtil {
    static success(res, message, data, statusCode = 200) {
        const response = {
            success: true,
            message,
            data,
        };
        return res.status(statusCode).json(response);
    }
    static error(res, message, error, statusCode = 400) {
        const response = {
            success: false,
            message,
            error,
        };
        return res.status(statusCode).json(response);
    }
    static paginated(res, message, data, pagination, statusCode = 200) {
        const response = {
            success: true,
            message,
            data,
            pagination,
        };
        return res.status(statusCode).json(response);
    }
}
exports.ApiResponseUtil = ApiResponseUtil;
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return ApiResponseUtil.success(res, message, data, statusCode);
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode = 400, error) => {
    return ApiResponseUtil.error(res, message, error, statusCode);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map