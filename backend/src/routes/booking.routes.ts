import { Router } from 'express';
import { body } from 'express-validator';
import { BookingController } from '../controllers/booking.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('PATIENT'),
  [
    body('patientId').notEmpty().withMessage('Patient ID is required'),
    body('therapistId').notEmpty().withMessage('Therapist ID is required'),
    body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
    body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('complaint').notEmpty().withMessage('Complaint is required'),
    validate,
  ],
  BookingController.createBooking
);

router.get('/my-bookings', authenticate, BookingController.getMyBookings);

router.get('/:id', authenticate, BookingController.getBookingById);

router.put(
  '/:id/status',
  authenticate,
  authorize('THERAPIST', 'ADMIN'),
  [body('status').notEmpty().withMessage('Status is required'), validate],
  BookingController.updateBookingStatus
);

router.put(
  '/:id/cancel',
  authenticate,
  authorize('PATIENT', 'THERAPIST', 'ADMIN'),
  BookingController.cancelBooking
);

export default router;
