"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TherapistController = void 0;
const therapist_service_1 = require("../services/therapist.service");
const response_1 = require("../utils/response");
class TherapistController {
    static async getAllTherapists(req, res) {
        try {
            const { specialization, location, minRating, isAvailable, page = '1', limit = '10' } = req.query;
            const filter = {
                specialization: specialization,
                location: location,
                minRating: minRating ? parseFloat(minRating) : undefined,
                isAvailable: isAvailable ? isAvailable === 'true' : undefined,
            };
            const result = await therapist_service_1.TherapistService.getAllTherapists(filter, parseInt(page), parseInt(limit));
            return response_1.ApiResponseUtil.paginated(res, 'Therapists retrieved successfully', result.therapists, result.pagination);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get therapists', error.message, 500);
        }
    }
    static async getTherapistById(req, res) {
        try {
            const { id } = req.params;
            const therapist = await therapist_service_1.TherapistService.getTherapistById(id);
            return response_1.ApiResponseUtil.success(res, 'Therapist retrieved successfully', therapist);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get therapist', error.message, 404);
        }
    }
    static async updateTherapist(req, res) {
        try {
            const { id } = req.params;
            const updatedTherapist = await therapist_service_1.TherapistService.updateTherapist(id, req.body);
            return response_1.ApiResponseUtil.success(res, 'Therapist updated successfully', updatedTherapist);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to update therapist', error.message, 400);
        }
    }
    static async setAvailability(req, res) {
        try {
            const { id } = req.params;
            const { availability } = req.body;
            if (!Array.isArray(availability)) {
                return response_1.ApiResponseUtil.error(res, 'Availability must be an array', undefined, 400);
            }
            const result = await therapist_service_1.TherapistService.setAvailability(id, availability);
            return response_1.ApiResponseUtil.success(res, 'Availability set successfully', result);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to set availability', error.message, 400);
        }
    }
    static async getAvailability(req, res) {
        try {
            const { id } = req.params;
            const availability = await therapist_service_1.TherapistService.getAvailability(id);
            return response_1.ApiResponseUtil.success(res, 'Availability retrieved successfully', availability);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get availability', error.message, 404);
        }
    }
}
exports.TherapistController = TherapistController;
//# sourceMappingURL=therapist.controller.js.map