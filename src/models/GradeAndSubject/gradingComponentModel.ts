import mongoose, { Document, Types } from 'mongoose';

export interface IGradingComponent extends Document {
  subject: Types.ObjectId;
  name: string;
  weightage: number;
  grade: string;
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
    required: [true, 'Please provide a weightage'],
  },
  grade: {
    type: String,
    enum: {
      values: ['one', 'two', 'three', 'four', 'five'],
      message: 'Please provide a valid grade (one, two, three, four, five).',
    },
    required: [true, 'Please provide a grade.'],
  },
});

gradingComponentSchema.index({ name: 1, grade: 1 }, { unique: true });

// Custom validator function to validate total weightage sum
gradingComponentSchema.path('weightage').validate(async function (value) {
  // const GradingComponentModel = mongoose.model<IGradingComponent>('GradingComponent');
  const gradingComponents = await GradingComponentModel.find({
    subject: this.subject,
    grade: this.grade,
  });

  let totalWeightage = 0;
  for (const component of gradingComponents) {
    totalWeightage += component.weightage;
  }

  return totalWeightage + value <= 100;
}, 'Total weightage sum exceeds 100.');

const GradingComponentModel = mongoose.model<IGradingComponent>(
  'GradingComponent',
  gradingComponentSchema
);

export default GradingComponentModel;
