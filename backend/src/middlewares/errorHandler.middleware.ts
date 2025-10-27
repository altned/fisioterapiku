import { Request, Response, NextFunction } from 'express';
import { ApiResponseUtil } from '../utils/response';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    ApiResponseUtil.error(res, 'Validation error', err.message, 400);
    return;
  }

  if (err.name === 'UnauthorizedError') {
    ApiResponseUtil.error(res, 'Unauthorized', err.message, 401);
    return;
  }

  ApiResponseUtil.error(
    res,
    'Internal server error',
    process.env.NODE_ENV === 'development' ? err.message : undefined,
    500
  );
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  ApiResponseUtil.error(res, 'Route not found', undefined, 404);
};
