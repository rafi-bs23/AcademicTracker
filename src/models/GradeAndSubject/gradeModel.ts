import mongoose, { Document, Types } from 'mongoose';

export interface IGrade extends Document {
  student: Types.ObjectId;
  subject: Types.ObjectId;
  gradingComponent: Types.ObjectId;
  score: Number;
  convertedMark: number;
}

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Please Provide a student'],
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Invalid subject id'],
  },
  gradingComponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GradingComponent',
    required: [true, 'Please provide a subject'],
  },
  score: {
    type: Number,
    required: [true, 'Pleae provide the score'],
  },
  convertedMark: {
    type: Number,
    required: [true, 'It must need converted mark from weightage'],
  },
});

gradeSchema.index({ student: 1, gradingComponent: 1 }, { unique: true });

const GradeModel = mongoose.model<IGrade>('Grade', gradeSchema);

export default GradeModel;
