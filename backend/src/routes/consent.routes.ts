import { Router } from 'express';
import { body } from 'express-validator';
import { ConsentController } from '../controllers/consent.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

// Create consent (Patient only)
router.post(
  '/',
  authenticate,
  authorize('PATIENT'),
  [
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
    validate,
  ],
  ConsentController.createConsent
);

// Get consent by booking ID (Authenticated users)
router.get(
  '/booking/:bookingId',
  authenticate,
  ConsentController.getConsentByBookingId
);

// Get consent text (Public - anyone can view)
router.get('/text', ConsentController.getConsentText);

// Agree to consent (Patient only)
router.post(
  '/:id/agree',
  authenticate,
  authorize('PATIENT'),
  [
    body('agreeExamination')
      .isBoolean()
      .withMessage('agreeExamination must be boolean'),
    body('agreeProcedure')
      .isBoolean()
      .withMessage('agreeProcedure must be boolean'),
    body('agreeRisks')
      .isBoolean()
      .withMessage('agreeRisks must be boolean'),
    body('agreeDataUsage')
      .isBoolean()
      .withMessage('agreeDataUsage must be boolean'),
    body('agreeEmergency')
      .isBoolean()
      .withMessage('agreeEmergency must be boolean'),
    validate,
  ],
  ConsentController.agreeConsent
);

// Get patient's consent history (Patient or Admin)
router.get(
  '/patient/:patientId',
  authenticate,
  ConsentController.getPatientConsents
);

// Validate consent for booking (Authenticated users)
router.get(
  '/validate/:bookingId',
  authenticate,
  ConsentController.validateConsent
);

export default router;
