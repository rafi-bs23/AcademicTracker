import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import GradingComponentModel, {
  IGradingComponent,
} from '../../models/GradeAndSubject/gradingComponentModel';
import SubjectModel, {
  ISubject,
} from '../../models/GradeAndSubject/subjectModel';
import { AppError } from '../../utils/appError';

export const createGradingComponent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subject, grade, name, weightage } = req.body;
    const subjectObj: ISubject | null = await SubjectModel.findOne({
      _id: subject,
    });
    if (!subjectObj) {
      return next(new AppError('Please provide a valid subject id.', 404));
    }
    const component: IGradingComponent = new GradingComponentModel({
      subject,
      name,
      weightage,
      grade,
    });
    const data = await component.save();

    res.status(201).json({
      status: 'success',
      data,
    });
  }
);

export const getAllGradingComponentForSpecificSubjectAndGrade = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subject, grade } = req.params;
    const components = await GradingComponentModel.find({ subject, grade });
    res.status(200).json({
      status: 'success',
      result: components.length,
      components,
    });
  }
);
