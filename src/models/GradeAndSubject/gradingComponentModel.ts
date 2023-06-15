import mongoose, { Document, Types } from 'mongoose';

export interface IGradingComponent extends Document {
  subject: Types.ObjectId;
  name: string;
  weightage: number;
}

const gradingComponentSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Please provide a subject'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  weightage: {
    type: Number,
    required: [true, 'Please provide a wightage'],
  },
});

const GradingComponentModel = mongoose.model<IGradingComponent>(
  'GradingComponent',
  gradingComponentSchema
);

export default GradingComponentModel;
