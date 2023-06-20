import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import morgan from 'morgan';
import dotenv from 'dotenv';

import userRouter from './routes/userRouter';
import subjectRouter from './routes/subjectRouter';
import gradeRouter from './routes/gradeRouter';
import { AppError } from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';

dotenv.config({ path: './config.env' });
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AcademicTracker',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
  // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/grade', gradeRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError(`Route Not Founded: `, 404));
});

app.use(globalErrorHandler);

export default app;
