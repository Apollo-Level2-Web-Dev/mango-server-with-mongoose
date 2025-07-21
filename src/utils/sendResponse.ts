import { Response } from 'express';

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: TMeta;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
