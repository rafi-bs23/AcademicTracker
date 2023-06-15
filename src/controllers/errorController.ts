import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

const operationalError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const nonOperationalError = (err: Error, res: Response) => {
  res.status(500).json({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

export const globalErrorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    operationalError(err, res);
  } else {
    nonOperationalError(err, res);
  }
};
