import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';

export const createSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('create subject');
  }
);
export const updateSubjectById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('update subject');
  }
);
export const deleteSubjectById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('delet subject');
  }
);

export const findAllSubjectInOneClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('find all subject in one class subject');
  }
);
