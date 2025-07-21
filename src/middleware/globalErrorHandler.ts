/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { handleCastValidationError } from '../error/castError';
import { handleDuplicateValidationError } from '../error/duplicateError';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // Handle Cast Validation Error
  if (error?.name === 'CastError') {
    const result = handleCastValidationError(error);
    return res.status(result.statusCode).json({
      success: false,
      message: result.message,
      errorMessage: result.errorMessage,
      errorDetails: result.errorDetails,
      stack: config.node_env === 'development' ? result.stack : undefined,
    });
  }

  // Handle Duplicate Validation Error
  if (error.code === 11000) {
    const result = handleDuplicateValidationError(error);

    return res.status(result.statusCode).json({
      success: false,
      message: result.message,
      errorMessage: result.errorMessage,
      errorDetails: result.errorDetails,
      stack: config.node_env === 'development' ? result.stack : undefined,
    });
  }

  // Handle other errors
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: error.message,
    errorDetails: error,
    stack: config.node_env === 'development' ? error.stack : undefined,
  });
};
