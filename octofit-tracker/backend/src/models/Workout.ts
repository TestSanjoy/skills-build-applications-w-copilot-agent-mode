import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  durationMinutes: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  exercises?: string[];
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  exercises: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
