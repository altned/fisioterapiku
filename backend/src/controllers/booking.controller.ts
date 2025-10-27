import { Response } from 'express';
import { BookingService } from '../services/booking.service';
import { ApiResponseUtil } from '../utils/response';
import { AuthRequest } from '../types';
import { BookingStatus } from '@prisma/client';

export class BookingController {
  static async createBooking(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const booking = await BookingService.createBooking({
        ...req.body,
        patientId: req.body.patientId,
      });

      return ApiResponseUtil.success(res, 'Booking created successfully', booking, 201);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to create booking', error.message, 400);
    }
  }

  static async getBookingById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const booking = await BookingService.getBookingById(id);
      return ApiResponseUtil.success(res, 'Booking retrieved successfully', booking);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get booking', error.message, 404);
    }
  }

  static async getMyBookings(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const { page = '1', limit = '10' } = req.query;
      const { role } = req.user;

      let result;

      if (role === 'PATIENT') {
        const patientId = req.query.patientId as string;
        if (!patientId) {
          return ApiResponseUtil.error(res, 'Patient ID is required', undefined, 400);
        }
        result = await BookingService.getBookingsByPatient(
          patientId,
          parseInt(page as string),
          parseInt(limit as string)
        );
      } else if (role === 'THERAPIST') {
        const therapistId = req.query.therapistId as string;
        if (!therapistId) {
          return ApiResponseUtil.error(res, 'Therapist ID is required', undefined, 400);
        }
        result = await BookingService.getBookingsByTherapist(
          therapistId,
          parseInt(page as string),
          parseInt(limit as string)
        );
      } else {
        return ApiResponseUtil.error(res, 'Invalid user role', undefined, 400);
      }

      return ApiResponseUtil.paginated(
        res,
        'Bookings retrieved successfully',
        result.bookings,
        result.pagination
      );
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get bookings', error.message, 500);
    }
  }

  static async updateBookingStatus(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const { id } = req.params;
      const { status } = req.body;

      if (!Object.values(BookingStatus).includes(status)) {
        return ApiResponseUtil.error(res, 'Invalid booking status', undefined, 400);
      }

      const booking = await BookingService.updateBookingStatus(id, status, req.user.id);
      return ApiResponseUtil.success(res, 'Booking status updated successfully', booking);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to update booking status', error.message, 400);
    }
  }

  static async cancelBooking(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      }

      const { id } = req.params;
      const booking = await BookingService.cancelBooking(id, req.user.id);
      return ApiResponseUtil.success(res, 'Booking cancelled successfully', booking);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to cancel booking', error.message, 400);
    }
  }
}
