import { Response } from 'express';
import { ApiResponse } from '../types';

export const successResponse = <T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = 200,
  pagination?: ApiResponse['pagination']
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = { success: true };
  if (data !== undefined) response.data = data;
  if (message) response.message = message;
  if (pagination) response.pagination = pagination;

  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errorDetails?: any
): Response<ApiResponse> => {
  const response: ApiResponse = {
    success: false,
    error: message,
  };
  
  if (errorDetails) {
    // Handling Zod-style or extended error arrays
    if (Array.isArray(errorDetails)) {
      response.error = errorDetails;
    } else {
      // Attach non-array error details as a specific field structure or log it
      response.error = errorDetails;
    }
  }

  return res.status(statusCode).json(response);
};
