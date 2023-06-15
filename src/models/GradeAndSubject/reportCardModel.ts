import mongoose, { Document, Types } from 'mongoose';

export interface IReportCard extends Document {
  student: Types.ObjectId;
  subjectGrades: Types.ObjectId[];
  overallGrade: string;
}

const reportCardSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Please provide a student'],
  },
  subjectGrades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  overallGrade: { type: String },
});

const ReportCardModel = mongoose.model<IReportCard>(
  'ReportCard',
  reportCardSchema
);
export default ReportCardModel;
