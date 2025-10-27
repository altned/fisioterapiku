import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { JwtUtil } from '../utils/jwt';
import { ApiResponseUtil } from '../utils/response';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ApiResponseUtil.error(res, 'No token provided', undefined, 401);
      return;
    }

    const token = authHeader.substring(7);
    const decoded = JwtUtil.verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    ApiResponseUtil.error(res, 'Invalid or expired token', undefined, 401);
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ApiResponseUtil.error(res, 'User not authenticated', undefined, 401);
      return;
    }

    if (!roles.includes(req.user.role)) {
      ApiResponseUtil.error(
        res,
        'You do not have permission to access this resource',
        undefined,
        403
      );
      return;
    }

    next();
  };
};
