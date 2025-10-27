import { Response } from 'express';
export declare class ApiResponseUtil {
    static success<T>(res: Response, message: string, data?: T, statusCode?: number): Response;
    static error(res: Response, message: string, error?: string, statusCode?: number): Response;
    static paginated<T>(res: Response, message: string, data: T, pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }, statusCode?: number): Response;
}
export declare const successResponse: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response;
export declare const errorResponse: (res: Response, message: string, statusCode?: number, error?: string) => Response;
//# sourceMappingURL=response.d.ts.map