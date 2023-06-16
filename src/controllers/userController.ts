import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import UserModel, { IUser } from '../models/Users/userModel';
import TeacherModel, { ITeacher } from '../models/Users/teacherModel';
import { IStudent } from '../models/Users/studentModel';
import { IParent } from '../models/Users/parentModel';
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

const createParent = (data: IParent, user: Types.ObjectId) => {
  const { firstName, lastName, email, phone, address } = data;
  const teacher: ITeacher = new TeacherModel({
    user,
    firstName,
    lastName,
    email,
    phone,
    address,
  });
  return teacher;
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

      await roleData!.validate();
      await roleData!.save({ session });

      await session.commitTransaction();

      res.status(201).json({
        status: 'success',
        data: role === 'admin' ? user : [user, roleData!],
      });
    } catch (err: any) {
      await session.abortTransaction();
      return next(new AppError('User creation fail', 500));
    } finally {
      session.endSession();
    }
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

export const deleteUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('delete user by id');
  }
);
