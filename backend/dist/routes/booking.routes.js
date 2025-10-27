"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const booking_controller_1 = require("../controllers/booking.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT'), [
    (0, express_validator_1.body)('patientId').notEmpty().withMessage('Patient ID is required'),
    (0, express_validator_1.body)('therapistId').notEmpty().withMessage('Therapist ID is required'),
    (0, express_validator_1.body)('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
    (0, express_validator_1.body)('appointmentTime').notEmpty().withMessage('Appointment time is required'),
    (0, express_validator_1.body)('location').notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('complaint').notEmpty().withMessage('Complaint is required'),
    validation_middleware_1.validate,
], booking_controller_1.BookingController.createBooking);
router.get('/my-bookings', auth_middleware_1.authenticate, booking_controller_1.BookingController.getMyBookings);
router.get('/:id', auth_middleware_1.authenticate, booking_controller_1.BookingController.getBookingById);
router.put('/:id/status', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('THERAPIST', 'ADMIN'), [(0, express_validator_1.body)('status').notEmpty().withMessage('Status is required'), validation_middleware_1.validate], booking_controller_1.BookingController.updateBookingStatus);
router.put('/:id/cancel', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT', 'THERAPIST', 'ADMIN'), booking_controller_1.BookingController.cancelBooking);
exports.default = router;
//# sourceMappingURL=booking.routes.js.map