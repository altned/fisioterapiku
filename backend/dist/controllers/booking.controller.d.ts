import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class BookingController {
    static createBooking(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getBookingById(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getMyBookings(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateBookingStatus(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static cancelBooking(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=booking.controller.d.ts.map