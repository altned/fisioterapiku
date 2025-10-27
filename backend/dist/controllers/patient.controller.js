"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const patient_service_1 = require("../services/patient.service");
const response_1 = require("../utils/response");
class PatientController {
    static async getProfile(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                (0, response_1.errorResponse)(res, 'User not authenticated', 401);
                return;
            }
            const patient = await patient_service_1.PatientService.getPatientByUserId(userId);
            if (!patient) {
                (0, response_1.errorResponse)(res, 'Patient profile not found', 404);
                return;
            }
            (0, response_1.successResponse)(res, patient, 'Profile retrieved successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                (0, response_1.errorResponse)(res, 'User not authenticated', 401);
                return;
            }
            const updatedPatient = await patient_service_1.PatientService.updatePatient(userId, req.body);
            (0, response_1.successResponse)(res, updatedPatient, 'Profile updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getBookings(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                (0, response_1.errorResponse)(res, 'User not authenticated', 401);
                return;
            }
            const patient = await patient_service_1.PatientService.getPatientByUserId(userId);
            if (!patient) {
                (0, response_1.errorResponse)(res, 'Patient not found', 404);
                return;
            }
            const bookings = await patient_service_1.PatientService.getPatientBookings(patient.id);
            (0, response_1.successResponse)(res, bookings, 'Bookings retrieved successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getBookingById(req, res, next) {
        try {
            const userId = req.user?.id;
            const bookingId = req.params.id;
            if (!userId) {
                (0, response_1.errorResponse)(res, 'User not authenticated', 401);
                return;
            }
            const patient = await patient_service_1.PatientService.getPatientByUserId(userId);
            if (!patient) {
                (0, response_1.errorResponse)(res, 'Patient not found', 404);
                return;
            }
            const booking = await patient_service_1.PatientService.getBookingById(bookingId, patient.id);
            if (!booking) {
                (0, response_1.errorResponse)(res, 'Booking not found', 404);
                return;
            }
            (0, response_1.successResponse)(res, booking, 'Booking retrieved successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getPatientById(req, res, next) {
        try {
            const patientId = req.params.id;
            const patient = await patient_service_1.PatientService.getPatientById(patientId);
            if (!patient) {
                (0, response_1.errorResponse)(res, 'Patient not found', 404);
                return;
            }
            (0, response_1.successResponse)(res, patient, 'Patient retrieved successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllPatients(_req, res, next) {
        try {
            const patients = await patient_service_1.PatientService.getAllPatients();
            (0, response_1.successResponse)(res, patients, 'Patients retrieved successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map