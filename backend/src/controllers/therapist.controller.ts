import { Request, Response } from 'express';
import { TherapistService } from '../services/therapist.service';
import { ApiResponseUtil } from '../utils/response';
import { AuthRequest } from '../types';

export class TherapistController {
  static async getAllTherapists(req: Request, res: Response) {
    try {
      const { specialization, location, minRating, isAvailable, page = '1', limit = '10' } = req.query;

      const filter = {
        specialization: specialization as string,
        location: location as string,
        minRating: minRating ? parseFloat(minRating as string) : undefined,
        isAvailable: isAvailable ? isAvailable === 'true' : undefined,
      };

      const result = await TherapistService.getAllTherapists(
        filter,
        parseInt(page as string),
        parseInt(limit as string)
      );

      return ApiResponseUtil.paginated(
        res,
        'Therapists retrieved successfully',
        result.therapists,
        result.pagination
      );
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get therapists', error.message, 500);
    }
  }

  static async getTherapistById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const therapist = await TherapistService.getTherapistById(id);
      return ApiResponseUtil.success(res, 'Therapist retrieved successfully', therapist);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get therapist', error.message, 404);
    }
  }

  static async updateTherapist(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updatedTherapist = await TherapistService.updateTherapist(id, req.body);
      return ApiResponseUtil.success(res, 'Therapist updated successfully', updatedTherapist);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to update therapist', error.message, 400);
    }
  }

  static async setAvailability(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { availability } = req.body;

      if (!Array.isArray(availability)) {
        return ApiResponseUtil.error(res, 'Availability must be an array', undefined, 400);
      }

      const result = await TherapistService.setAvailability(id, availability);
      return ApiResponseUtil.success(res, 'Availability set successfully', result);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to set availability', error.message, 400);
    }
  }

  static async getAvailability(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const availability = await TherapistService.getAvailability(id);
      return ApiResponseUtil.success(res, 'Availability retrieved successfully', availability);
    } catch (error: any) {
      return ApiResponseUtil.error(res, 'Failed to get availability', error.message, 404);
    }
  }
}
