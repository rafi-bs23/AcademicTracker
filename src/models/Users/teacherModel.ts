import mongoose, { Types, Document, Schema } from 'mongoose';

export interface ITeacher extends Document {
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  address: string;
}

const teacherSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User must needed'],
  },
  firstName: {
    type: String,
    required: [true, 'Please provide a first name.'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name.'],
  },
  email: {
    type: String,
    required: [true, 'Pleae provide a email.'],
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide dateOfBirth'],
  },
  gender: {
    type: String,
    required: [true, 'Pleaes provide a gender.'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone'],
  },
  address: {
    type: String,
    required: [true, 'Please provide a address'],
  },
});

const TeacherModel = mongoose.model<ITeacher>('Teacher', teacherSchema);
export default TeacherModel;
