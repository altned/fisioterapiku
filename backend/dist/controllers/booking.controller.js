"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("../services/booking.service");
const response_1 = require("../utils/response");
const client_1 = require("@prisma/client");
class BookingController {
    static async createBooking(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const booking = await booking_service_1.BookingService.createBooking({
                ...req.body,
                patientId: req.body.patientId,
            });
            return response_1.ApiResponseUtil.success(res, 'Booking created successfully', booking, 201);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to create booking', error.message, 400);
        }
    }
    static async getBookingById(req, res) {
        try {
            const { id } = req.params;
            const booking = await booking_service_1.BookingService.getBookingById(id);
            return response_1.ApiResponseUtil.success(res, 'Booking retrieved successfully', booking);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get booking', error.message, 404);
        }
    }
    static async getMyBookings(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const { page = '1', limit = '10' } = req.query;
            const { role } = req.user;
            let result;
            if (role === 'PATIENT') {
                const patientId = req.query.patientId;
                if (!patientId) {
                    return response_1.ApiResponseUtil.error(res, 'Patient ID is required', undefined, 400);
                }
                result = await booking_service_1.BookingService.getBookingsByPatient(patientId, parseInt(page), parseInt(limit));
            }
            else if (role === 'THERAPIST') {
                const therapistId = req.query.therapistId;
                if (!therapistId) {
                    return response_1.ApiResponseUtil.error(res, 'Therapist ID is required', undefined, 400);
                }
                result = await booking_service_1.BookingService.getBookingsByTherapist(therapistId, parseInt(page), parseInt(limit));
            }
            else {
                return response_1.ApiResponseUtil.error(res, 'Invalid user role', undefined, 400);
            }
            return response_1.ApiResponseUtil.paginated(res, 'Bookings retrieved successfully', result.bookings, result.pagination);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to get bookings', error.message, 500);
        }
    }
    static async updateBookingStatus(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const { id } = req.params;
            const { status } = req.body;
            if (!Object.values(client_1.BookingStatus).includes(status)) {
                return response_1.ApiResponseUtil.error(res, 'Invalid booking status', undefined, 400);
            }
            const booking = await booking_service_1.BookingService.updateBookingStatus(id, status, req.user.id);
            return response_1.ApiResponseUtil.success(res, 'Booking status updated successfully', booking);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to update booking status', error.message, 400);
        }
    }
    static async cancelBooking(req, res) {
        try {
            if (!req.user) {
                return response_1.ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
            }
            const { id } = req.params;
            const booking = await booking_service_1.BookingService.cancelBooking(id, req.user.id);
            return response_1.ApiResponseUtil.success(res, 'Booking cancelled successfully', booking);
        }
        catch (error) {
            return response_1.ApiResponseUtil.error(res, 'Failed to cancel booking', error.message, 400);
        }
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map