import mongoose from 'mongoose';
import config from '../config';
import { TErrorResponse } from '../interfaces/error';

export const handleCastValidationError = (
  error: mongoose.Error.CastError
): TErrorResponse => {
  const statusCode = 400;
  const message = 'Invalid ID';
  const errorMessage = `${error.value} is not a valid ID!`;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: error,
    stack: config.node_env === 'development' ? error.stack : undefined,
  };
};
