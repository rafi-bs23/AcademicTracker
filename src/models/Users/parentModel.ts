import mongoose, { Schema, Types, Document } from 'mongoose';

export interface IParent extends Document {
  user: Types.ObjectId;
  student: Types.ObjectId;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
}

const parentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User must needed'],
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'You must provide a student'],
  },
  firstName: {
    type: String,
    required: [true, 'Please Provide a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Pleae provide a last name'],
  },
  address: {
    type: String,
    required: [true, 'Please Provide a address'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email.'],
  },
});

const parentModel = mongoose.model<IParent>('Parent', parentSchema);

export default parentModel;
