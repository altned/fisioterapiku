import { Router } from 'express';
import { body } from 'express-validator';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.post(
  '/upload-proof',
  authenticate,
  authorize('PATIENT'),
  [
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
    body('paymentProof').notEmpty().withMessage('Payment proof is required'),
    body('method')
      .isIn(['BANK_TRANSFER', 'QRIS'])
      .withMessage('Invalid payment method'),
    validate,
  ],
  PaymentController.uploadPaymentProof
);

router.post(
  '/:id/verify',
  authenticate,
  authorize('ADMIN'),
  PaymentController.verifyPayment
);

router.post(
  '/:id/reject',
  authenticate,
  authorize('ADMIN'),
  [body('notes').notEmpty().withMessage('Rejection notes are required'), validate],
  PaymentController.rejectPayment
);

router.get('/booking/:bookingId', authenticate, PaymentController.getPaymentByBookingId);

router.get('/pending', authenticate, authorize('ADMIN'), PaymentController.getPendingPayments);

export default router;
