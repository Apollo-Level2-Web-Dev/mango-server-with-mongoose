/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: string | any;
  error?: any;
  stack?: string | any;
};
