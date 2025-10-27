import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class PaymentController {
    static uploadPaymentProof(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static verifyPayment(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static rejectPayment(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getPaymentByBookingId(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getPendingPayments(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=payment.controller.d.ts.map