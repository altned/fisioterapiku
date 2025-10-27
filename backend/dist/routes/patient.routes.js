"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const patient_controller_1 = require("../controllers/patient.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
router.get('/profile', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT'), patient_controller_1.PatientController.getProfile);
router.put('/profile', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT'), [
    (0, express_validator_1.body)('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty'),
    (0, express_validator_1.body)('address').optional().trim(),
    (0, express_validator_1.body)('dateOfBirth').optional().isISO8601().withMessage('Invalid date format'),
    (0, express_validator_1.body)('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    validation_middleware_1.validate,
], patient_controller_1.PatientController.updateProfile);
router.get('/bookings', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT'), patient_controller_1.PatientController.getBookings);
router.get('/bookings/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT'), patient_controller_1.PatientController.getBookingById);
router.get('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN', 'THERAPIST'), patient_controller_1.PatientController.getPatientById);
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), patient_controller_1.PatientController.getAllPatients);
exports.default = router;
//# sourceMappingURL=patient.routes.js.map