import { Response } from 'express';
import { ApiResponse } from '../types';

export class ApiResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    error?: string,
    statusCode: number = 400
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };
    return res.status(statusCode).json(response);
  }

  static paginated<T>(
    res: Response,
    message: string,
    data: T,
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      pagination,
    };
    return res.status(statusCode).json(response);
  }
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  return ApiResponseUtil.success(res, message, data, statusCode);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  error?: string
): Response => {
  return ApiResponseUtil.error(res, message, error, statusCode);
};
