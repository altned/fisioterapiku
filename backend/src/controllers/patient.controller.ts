import { Response, NextFunction } from 'express';
import { PatientService } from '../services/patient.service';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../types';

export class PatientController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        errorResponse(res, 'User not authenticated', 401);
        return;
      }

      const patient = await PatientService.getPatientByUserId(userId);

      if (!patient) {
        errorResponse(res, 'Patient profile not found', 404);
        return;
      }

      successResponse(res, patient, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        errorResponse(res, 'User not authenticated', 401);
        return;
      }

      const updatedPatient = await PatientService.updatePatient(userId, req.body);

      successResponse(res, updatedPatient, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getBookings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        errorResponse(res, 'User not authenticated', 401);
        return;
      }

      const patient = await PatientService.getPatientByUserId(userId);

      if (!patient) {
        errorResponse(res, 'Patient not found', 404);
        return;
      }

      const bookings = await PatientService.getPatientBookings(patient.id);

      successResponse(res, bookings, 'Bookings retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getBookingById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const bookingId = req.params.id;

      if (!userId) {
        errorResponse(res, 'User not authenticated', 401);
        return;
      }

      const patient = await PatientService.getPatientByUserId(userId);

      if (!patient) {
        errorResponse(res, 'Patient not found', 404);
        return;
      }

      const booking = await PatientService.getBookingById(bookingId, patient.id);

      if (!booking) {
        errorResponse(res, 'Booking not found', 404);
        return;
      }

      successResponse(res, booking, 'Booking retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getPatientById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const patientId = req.params.id;

      const patient = await PatientService.getPatientById(patientId);

      if (!patient) {
        errorResponse(res, 'Patient not found', 404);
        return;
      }

      successResponse(res, patient, 'Patient retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAllPatients(_req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const patients = await PatientService.getAllPatients();

      successResponse(res, patients, 'Patients retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
