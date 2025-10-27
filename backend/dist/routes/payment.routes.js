"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
router.post('/upload-proof', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('PATIENT'), [
    (0, express_validator_1.body)('bookingId').notEmpty().withMessage('Booking ID is required'),
    (0, express_validator_1.body)('paymentProof').notEmpty().withMessage('Payment proof is required'),
    (0, express_validator_1.body)('method')
        .isIn(['BANK_TRANSFER', 'QRIS'])
        .withMessage('Invalid payment method'),
    validation_middleware_1.validate,
], payment_controller_1.PaymentController.uploadPaymentProof);
router.post('/:id/verify', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), payment_controller_1.PaymentController.verifyPayment);
router.post('/:id/reject', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), [(0, express_validator_1.body)('notes').notEmpty().withMessage('Rejection notes are required'), validation_middleware_1.validate], payment_controller_1.PaymentController.rejectPayment);
router.get('/booking/:bookingId', auth_middleware_1.authenticate, payment_controller_1.PaymentController.getPaymentByBookingId);
router.get('/pending', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), payment_controller_1.PaymentController.getPendingPayments);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map