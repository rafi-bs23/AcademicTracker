import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import GradeModel, { IGrade } from '../../models/GradeAndSubject/gradeModel';
import StudentModel, { IStudent } from '../../models/Users/studentModel';
import GradingComponentModel from '../../models/GradeAndSubject/gradingComponentModel';
import { AppError } from '../../utils/appError';

export const createGrade = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, gradingComponent, score } = req.body;
    const studentObj = await StudentModel.findOne({ _id: student });
    if (!studentObj) {
      return next(new AppError('Please provide a valid student id.', 404));
    }
    const gradingComponentObj = await GradingComponentModel.findOne({
      _id: gradingComponent,
    });
    console.log(gradingComponentObj);
    const convertedMark: Number =
      (score / 100) * gradingComponentObj!.weightage;
    if (!gradingComponentObj) {
      return next(
        new AppError('Please provide a valid grading component id.', 404)
      );
    }
    const grade: IGrade = new GradeModel({
      student,
      gradingComponent,
      score,
      convertedMark,
    });
    await grade.save();
    res.status(201).json({
      status: 'success',
      grade,
    });
  }
);

export const getReportCard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student } = req.body;
    const studentObj: IStudent | null = await StudentModel.findById(student);
    const grades: IGrade[] = await GradeModel.find({ student });
    console.log(studentObj);
    console.log(grades);
    // console.log(grades)
    res.send('get report card');
  }
);
