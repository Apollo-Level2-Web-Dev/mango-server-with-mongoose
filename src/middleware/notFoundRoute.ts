import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export const notFoundRoute = (
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    error: 'Route not found',
  })
}
