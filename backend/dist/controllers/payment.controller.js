"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("../services/payment.service");
const response_1 = require("../utils/response");
class PaymentController {
    static async uploadPaymentProof(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const { bookingId, paymentProof, method } = req.body;
            const payment = await payment_service_1.PaymentService.uploadPaymentProof({
                bookingId,
                paymentProof,
                method,
            });
            return response_1.ApiResponseUtil.success(res, 'Payment proof uploaded successfully', payment);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to upload payment proof', error.message, 400);
        }
    }
    static async verifyPayment(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const { id } = req.params;
            const { notes } = req.body;
            const payment = await payment_service_1.PaymentService.verifyPayment(id, req.user.id, notes);
            return response_1.ApiResponseUtil.success(res, 'Payment verified successfully', payment);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to verify payment', error.message, 400);
        }
    }
    static async rejectPayment(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const { id } = req.params;
            const { notes } = req.body;
            if (!notes) {
                return response_1.ApiResponseUtil.error(res, 'Rejection notes are required', undefined, 400);
            }
            const payment = await payment_service_1.PaymentService.rejectPayment(id, req.user.id, notes);
            return response_1.ApiResponseUtil.success(res, 'Payment rejected successfully', payment);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to reject payment', error.message, 400);
        }
    }
    static async getPaymentByBookingId(req, res) {
        try {
            const { bookingId } = req.params;
            const payment = await payment_service_1.PaymentService.getPaymentByBookingId(bookingId);
            return response_1.ApiResponseUtil.success(res, 'Payment retrieved successfully', payment);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get payment', error.message, 404);
        }
    }
    static async getPendingPayments(req, res) {
        try {
            const { page = '1', limit = '10' } = req.query;
            const result = await payment_service_1.PaymentService.getPendingPayments(parseInt(page), parseInt(limit));
            return response_1.ApiResponseUtil.paginated(res, 'Pending payments retrieved successfully', result.payments, result.pagination);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get pending payments', error.message, 500);
        }
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map