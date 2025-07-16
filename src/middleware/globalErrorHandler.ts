import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interfaces/error";
import mongoose from "mongoose";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorSources: TErrorSources[] = [];

  if (err.code === 11000) {
    const duplicate = err.message.match(/"([^"]*)"/)[1];
    message = `${duplicate} is already exists`;
  } else if (err instanceof mongoose.Error.CastError) {
    message = "Invalid Mongodb ObjectId";
  } else if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors);

    errors.forEach((error) => {
      errorSources.push({
        path: error.path,
        message: error.message,
      });
    });
  } else if (err instanceof ZodError) {
    err.issues.forEach((issue) => {
      errorSources.push({
        path: issue.path[issue.path.length - 1] as string,
        message: issue.message,
      });
    });
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: errorSources,
    errorDetails: err,
  });
};

export default globalErrorHandler;
