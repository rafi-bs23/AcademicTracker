import mongoose, { Document, Types } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  teacher: Types.ObjectId;
  grade: string;
}

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please assign a teacher.'],
  },
  grade: {
    type: String,
    enum: {
      values: ['one', 'two', 'three', 'four', 'five'],
      message: 'Please provide us a valid class (one, two, three, four, five)',
    },
    required: [true, 'Please provide a grade'],
  },
});
// Add a compound index to enforce uniqueness on 'name' and 'grade' fields
subjectSchema.index({ name: 1, grade: 1 }, { unique: true });

const SubjectModel = mongoose.model<ISubject>('Subject', subjectSchema);

export default SubjectModel;
