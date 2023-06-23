import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import GradeModel, { IGrade } from '../../models/GradeAndSubject/gradeModel';
import StudentModel from '../../models/Users/studentModel';
import GradingComponentModel from '../../models/GradeAndSubject/gradingComponentModel';
import { AppError } from '../../utils/appError';
import { Types } from 'mongoose';

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
    const subject: Types.ObjectId | undefined = gradingComponentObj?.subject;
    // console.log(gradingComponentObj);
    const convertedMark: Number =
      (score / 100) * gradingComponentObj!.weightage;
    if (!gradingComponentObj) {
      return next(
        new AppError('Please provide a valid grading component id.', 404)
      );
    }
    console.log(subject);
    const grade: IGrade = new GradeModel({
      student,
      subject,
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

    const gradesWithGradingComponent: IGrade[] = await GradeModel.find({
      student,
    })
      .populate('gradingComponent')
      .populate('subject')
      .lean();

    const subjects: Types.ObjectId[] = [
      ...new Set(gradesWithGradingComponent.map((el) => el.subject)),
    ];

    const gradesPromises: Promise<IGrade[]>[] = subjects.map((subject) =>
      GradeModel.find({ subject }).lean()
    );

    const grades = await Promise.all(gradesPromises);
    console.log(grades);

    const reportCard = subjects.map((subject, index) => ({
      subject,
      grades: grades[index],
    }));

    res.status(200).json({
      status: 'success',
      result: subjects.length,
      reportCard,
    });
  }
);

// const getInfo = async function (subject: Types.ObjectId) {

// };

// export const getReportCard = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { student } = req.body;
//     // const studentObj: IStudent | null = await StudentModel.findById(student);
//     const gradesWithGradingComponent: IGrade[] = await GradeModel.find({
//       student,
//     })
//       .populate('gradingComponent')
//       .populate('subject')
//       .lean();
//     const subjects: Types.ObjectId[] = [
//       ...new Set(gradesWithGradingComponent.map((el) => el.subject)),
//     ];

//     subjects.forEach((el) => {
//       console.log(el);
//       getInfo(el);
//       // const grades: IGrade[] = await GradeModel.find(el);
//     });
//     // console.log(subjects);

//     // console.log(grades)
//     res.status(200).json({
//       status: 'success',
//       result: subjects.length,
//       reportCard: {
//         subjects,
//       },
//     });
//   }
// );
