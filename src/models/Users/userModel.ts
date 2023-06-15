import mongoose, { Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
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

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
