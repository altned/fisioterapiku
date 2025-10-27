import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare class PatientController {
    static getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getBookings(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getBookingById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getPatientById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getAllPatients(_req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=patient.controller.d.ts.map