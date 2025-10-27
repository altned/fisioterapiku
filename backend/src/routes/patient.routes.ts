import { Router } from 'express';
import { body } from 'express-validator';
import { PatientController } from '../controllers/patient.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.get(
  '/profile',
  authenticate,
  authorize('PATIENT'),
  PatientController.getProfile
);

router.put(
  '/profile',
  authenticate,
  authorize('PATIENT'),
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty'),
    body('address').optional().trim(),
    body('dateOfBirth').optional().isISO8601().withMessage('Invalid date format'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    validate,
  ],
  PatientController.updateProfile
);

router.get(
  '/bookings',
  authenticate,
  authorize('PATIENT'),
  PatientController.getBookings
);

router.get(
  '/bookings/:id',
  authenticate,
  authorize('PATIENT'),
  PatientController.getBookingById
);

router.get(
  '/:id',
  authenticate,
  authorize('ADMIN', 'THERAPIST'),
  PatientController.getPatientById
);

router.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  PatientController.getAllPatients
);

export default router;
