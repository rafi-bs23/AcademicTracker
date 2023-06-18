import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import UserModel, { IUser } from '../models/Users/userModel';
import TeacherModel, { ITeacher } from '../models/Users/teacherModel';
import StudentModel, { IStudent } from '../models/Users/studentModel';
import ParentModel, { IParent } from '../models/Users/parentModel';
import { AppError } from '../utils/appError';
import mongoose, { Types } from 'mongoose';

const createTeacher = (data: ITeacher, user: Types.ObjectId) => {
  const { firstName, lastName, email, dateOfBirth, gender, phone, address } =
    data;
  const teacher: ITeacher = new TeacherModel({
    user,
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    phone,
    address,
  });
  return teacher;
};

const createStudent = (data: IStudent, user: Types.ObjectId) => {
  const { firstName, lastName, email, dateOfBirth, gender, phone, address } =
    data;
  const student: IStudent = new StudentModel({
    user,
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    phone,
    address,
  });
  return student;
};

const createParent = (data: IParent, user: Types.ObjectId) => {
  const { student, firstName, lastName, email, phone, address } = data;
  const parent: IParent = new ParentModel({
    user,
    student,
    firstName,
    lastName,
    email,
    phone,
    address,
  });
  return parent;
};

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, confirmPassword, role, ...userData } = req.body;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      // Create a new user
      const user: IUser = new UserModel({
        username,
        password,
        confirmPassword,
        role,
      });
      // Validate the user schema
      await user.validate();

      // Save the user in the database
      await user.save({ session });

      let roleData: ITeacher | IStudent | IParent;

      if (role === 'teacher') roleData = createTeacher(userData, user._id);
      else if (role === 'student') roleData = createStudent(userData, user._id);
      else if (role === 'parent') roleData = createParent(userData, user._id);

      if (role !== 'admin') {
        await roleData!.validate();
        await roleData!.save({ session });
      }

      await session.commitTransaction();

      res.status(201).json({
        status: 'success',
        data: role === 'admin' ? user : [user, roleData!],
      });
    } catch (err: any) {
      await session.abortTransaction();
      return next(new AppError(err.message, 500));
    } finally {
      session.endSession();
    }
  }
);

export const getAllRolebaseUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.params;
    let user: ITeacher[] | IStudent[] | IParent[];
    if (role === 'teachers')
      user = (await TeacherModel.find()) as ITeacher[]; // Type assertion
    else if (role === 'students')
      user = (await StudentModel.find()) as IStudent[]; // Type assertion
    else if (role === 'parents')
      user = (await ParentModel.find()) as IParent[]; // Type assertion
    else return next(new AppError('Please provide a valid role', 404));

    res.status(200).json({
      status: 'success',
      result: user.length,
      data: user,
    });
  }
);

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('get user by id');
  }
);

export const updateUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('update user by id');
  }
);

export const deleteUserByIdandRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = req.params;
    if (role === 'teacher') {
      const user = await TeacherModel.findById(id);
      await UserModel.findByIdAndDelete(user?.user);
      await TeacherModel.findByIdAndDelete(id);
    } else if (role === 'student') {
      const user = await StudentModel.findById(id);
      await UserModel.findByIdAndDelete(user?.user);
      await StudentModel.findByIdAndDelete(id);
    } else if (role === 'parent') {
      const user = await ParentModel.findById(id);
      await UserModel.findByIdAndDelete(user?.user);
      await ParentModel.findByIdAndDelete(id);
    } else return next(new AppError('Please provide a valid role', 404));
    res.status(204).json({
      status: 'User deleted successfully.',
    });
  }
);
