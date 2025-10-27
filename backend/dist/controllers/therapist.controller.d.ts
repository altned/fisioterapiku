import { Request, Response } from 'express';
import { AuthRequest } from '../types';
export declare class TherapistController {
    static getAllTherapists(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getTherapistById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateTherapist(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static setAvailability(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAvailability(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=therapist.controller.d.ts.map