"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const response_1 = require("../utils/response");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg).join(', ');
        response_1.ApiResponseUtil.error(res, 'Validation failed', errorMessages, 400);
        return;
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map