import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRouter from './routes/adminRouter';
import { AppError } from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';

dotenv.config({ path: './config.env' });
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/user', userRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError(`Route Not Founded: ${req.url}`, 404));
});

app.use(globalErrorHandler);

export default app;
