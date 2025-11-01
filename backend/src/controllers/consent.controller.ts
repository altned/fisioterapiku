import { Response } from 'express';
import { ConsentService } from '../services/consent.service';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../types';

export class ConsentController {
  /**
   * POST /api/consents
   * Create a new consent for a booking
   */
  static async createConsent(req: AuthRequest, res: Response) {
    try {
      const { bookingId } = req.body;
      const patientId = req.user?.profile?.id;

      if (!patientId) {
        return errorResponse(res, 'Patient ID not found', 400);
      }

      if (!bookingId) {
        return errorResponse(res, 'Booking ID is required', 400);
      }

      const consent = await ConsentService.createConsent({
        bookingId,
        patientId,
      });

      return successResponse(res, consent, 'Consent created successfully', 201);
    } catch (error: any) {
      return errorResponse(res, error.message || 'Failed to create consent', 500);
    }
  }

  /**
   * GET /api/consents/booking/:bookingId
   * Get consent by booking ID
   */
  static async getConsentByBookingId(req: AuthRequest, res: Response) {
    try {
      const { bookingId } = req.params;

      const consent = await ConsentService.getConsentByBookingId(bookingId);

      if (!consent) {
        return errorResponse(res, 'Consent not found', 404);
      }

      return successResponse(res, consent, 'Consent retrieved successfully');
    } catch (error: any) {
      return errorResponse(res, error.message || 'Failed to get consent', 500);
    }
  }

  /**
   * GET /api/consents/text
   * Get current consent text and version
   */
  static async getConsentText(_req: AuthRequest, res: Response) {
    try {
      const consentData = ConsentService.getCurrentConsentText();
      return successResponse(res, consentData, 'Consent text retrieved successfully');
    } catch (error: any) {
      return errorResponse(res, error.message || 'Failed to get consent text', 500);
    }
  }

  /**
   * POST /api/consents/:id/agree
   * Agree to consent
   */
  static async agreeConsent(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const {
        agreeExamination,
        agreeProcedure,
        agreeRisks,
        agreeDataUsage,
        agreeEmergency,
      } = req.body;

      // Get IP address
      const ipAddress =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.socket.remoteAddress ||
        'unknown';

      // Get device info from user-agent
      const deviceInfo = req.headers['user-agent'] || 'unknown';

      const consent = await ConsentService.agreeConsent(id, {
        agreeExamination: agreeExamination === true,
        agreeProcedure: agreeProcedure === true,
        agreeRisks: agreeRisks === true,
        agreeDataUsage: agreeDataUsage === true,
        agreeEmergency: agreeEmergency === true,
        ipAddress,
        deviceInfo,
      });

      return successResponse(res, consent, 'Consent agreed successfully');
    } catch (error: any) {
      return errorResponse(res, error.message || 'Failed to agree consent', 500);
    }
  }

  /**
   * GET /api/consents/patient/:patientId
   * Get all consents for a patient
   */
  static async getPatientConsents(req: AuthRequest, res: Response) {
    try {
      const { patientId } = req.params;
      const userPatientId = req.user?.profile?.id;

      // Ensure patient can only see their own consents
      if (req.user?.role === 'PATIENT' && patientId !== userPatientId) {
        return errorResponse(res, 'Unauthorized', 403);
      }

      const consents = await ConsentService.getPatientConsents(patientId);

      return successResponse(res, consents, 'Patient consents retrieved successfully');
    } catch (error: any) {
      return errorResponse(res, error.message || 'Failed to get patient consents', 500);
    }
  }

  /**
   * GET /api/consents/validate/:bookingId
   * Validate consent for a booking
   */
  static async validateConsent(req: AuthRequest, res: Response) {
    try {
      const { bookingId } = req.params;

      const isValid = await ConsentService.validateConsentForBooking(bookingId);

      return successResponse(
        res,
        { isValid },
        isValid ? 'Consent is valid' : 'Consent is not valid'
      );
    } catch (error: any) {
      return errorResponse(res, error.message || 'Failed to validate consent', 500);
    }
  }
}
