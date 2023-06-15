import mongoose, { Document, Types } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  teacher: Types.ObjectId;
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
});

const SubjectModel = mongoose.model<ISubject>('Subject', subjectSchema);

export default SubjectModel;
