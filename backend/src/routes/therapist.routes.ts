import { Router } from 'express';
import { TherapistController } from '../controllers/therapist.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', TherapistController.getAllTherapists);
router.get('/:id', TherapistController.getTherapistById);

router.put(
  '/:id',
  authenticate,
  authorize('THERAPIST', 'ADMIN'),
  TherapistController.updateTherapist
);

router.post(
  '/:id/availability',
  authenticate,
  authorize('THERAPIST', 'ADMIN'),
  TherapistController.setAvailability
);

router.get('/:id/availability', TherapistController.getAvailability);

export default router;
