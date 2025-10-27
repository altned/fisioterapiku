import { Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { ApiResponseUtil } from '../utils/response';
import { AuthRequest } from '../types';

export class PaymentController {
  static async uploadPaymentProof(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const { bookingId, paymentProof, method } = req.body;

      const payment = await PaymentService.uploadPaymentProof({
        bookingId,
        paymentProof,
        method,
      });

      return ApiResponseUtil.success(res, 'Payment proof uploaded successfully', payment);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to upload payment proof', error.message, 400);
    }
  }

  static async verifyPayment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const { id } = req.params;
      const { notes } = req.body;

      const payment = await PaymentService.verifyPayment(id, req.user.id, notes);
      return ApiResponseUtil.success(res, 'Payment verified successfully', payment);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to verify payment', error.message, 400);
    }
  }

  static async rejectPayment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const { id } = req.params;
      const { notes } = req.body;

      if (!notes) {
        return ApiResponseUtil.error(res, 'Rejection notes are required', undefined, 400);
      }

      const payment = await PaymentService.rejectPayment(id, req.user.id, notes);
      return ApiResponseUtil.success(res, 'Payment rejected successfully', payment);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to reject payment', error.message, 400);
    }
  }

  static async getPaymentByBookingId(req: AuthRequest, res: Response) {
    try {
      const { bookingId } = req.params;
      const payment = await PaymentService.getPaymentByBookingId(bookingId);
      return ApiResponseUtil.success(res, 'Payment retrieved successfully', payment);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get payment', error.message, 404);
    }
  }

  static async getPendingPayments(req: AuthRequest, res: Response) {
    try {
      const { page = '1', limit = '10' } = req.query;

      const result = await PaymentService.getPendingPayments(
        parseInt(page as string),
        parseInt(limit as string)
      );

      return ApiResponseUtil.paginated(
        res,
        'Pending payments retrieved successfully',
        result.payments,
        result.pagination
      );
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get pending payments', error.message, 500);
    }
  }
}
