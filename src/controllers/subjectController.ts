import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import SubjectModel, { ISubject } from '../models/GradeAndSubject/subjectModel';
import TeacherModel, { ITeacher } from '../models/Users/teacherModel';
import { AppError } from '../utils/appError';

export const createSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, teacher, grade } = req.body;
    console.log(teacher);
    const teacherObj: ITeacher | null = await TeacherModel.findOne({
      _id: teacher,
    });
    console.log(teacherObj);
    if (!teacherObj) {
      return next(new AppError('Teacher not found!', 404));
    }
    const subject: ISubject = new SubjectModel({
      name,
      teacher,
      grade,
    });
    await subject.validate();
    const data = await subject.save();
    res.status(201).json({
      status: 'success',
      data,
    });
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