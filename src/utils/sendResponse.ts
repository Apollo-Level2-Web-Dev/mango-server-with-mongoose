// success
// statusCode
// Message
// data

import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
