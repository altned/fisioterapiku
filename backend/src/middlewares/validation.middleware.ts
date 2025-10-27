import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponseUtil } from '../utils/response';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg).join(', ');
    ApiResponseUtil.error(res, 'Validation failed', errorMessages, 400);
    return;
  }

  next();
};
