"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('role').isIn(['PATIENT', 'THERAPIST', 'ADMIN']).withMessage('Invalid role'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone is required'),
    validation_middleware_1.validate,
], auth_controller_1.AuthController.register);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    validation_middleware_1.validate,
], auth_controller_1.AuthController.login);
router.post('/refresh', [(0, express_validator_1.body)('refreshToken').notEmpty().withMessage('Refresh token is required'), validation_middleware_1.validate], auth_controller_1.AuthController.refreshToken);
router.get('/profile', auth_middleware_1.authenticate, auth_controller_1.AuthController.getProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map