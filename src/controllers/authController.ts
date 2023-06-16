import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { catchAsync } from '../utils/catchAsync';
import UserModel from '../models/Users/userModel';
import { AppError } from '../utils/appError';
import { signToken } from '../utils/signToken';

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).select('+password');

    if (!user || !user.comparePassword(password, user.password)) {
      return next(new AppError('username or password did not match', 401));
    }
    const token = await signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new AppError('Invalid token, Pleaes login to access.', 401));
    }
    let decode: string | JwtPayload = await jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    );
    if (typeof decode === 'string') decode = JSON.parse(decode);
    decode = decode as object;

    const user = await UserModel.findById(decode.id);
    if (!user) {
      return next(new AppError('Invalid token, Please login to access.', 401));
    }

    req.user = user;
    next();
  }
);

//i'll wrap it some other time if needed
export const restrictTo = function (...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};
