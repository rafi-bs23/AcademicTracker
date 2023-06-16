import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  comparePassword(candidPassword: string, hashPassword: string): Boolean;
}

const checkPasswordAndConfirmPassword = function (
  this: IUser,
  confirmPassword: string
) {
  return this.password === confirmPassword;
};

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: checkPasswordAndConfirmPassword,
      message: 'Confirm password did not match!',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'teacher', 'student', 'parent'],
      message: 'role can be admin, teacher, student and parent only',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password!, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  candidPassword: string,
  hashPassword: string
) {
  return bcrypt.compare(candidPassword, hashPassword);
};

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
