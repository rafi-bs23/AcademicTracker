import mongoose, { Document, Types } from 'mongoose';

export interface IGrade extends Document {
  student: Types.ObjectId;
  subject: Types.ObjectId;
  score: Number;
  comment: string;
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
    required: [true, 'Please provide a subject'],
  },
  score: {
    type: Number,
    required: [true, 'Pleae provide the score'],
  },
  comment: String,
});

const GradeModel = mongoose.model<IGrade>('Grade', gradeSchema);

export default GradeModel;
