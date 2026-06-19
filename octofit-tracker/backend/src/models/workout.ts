import { Schema, model } from 'mongoose';

interface IWorkout {
  name: string;
  exercises: string[];
  durationMinutes: number;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  exercises: { type: [String], default: [] },
  durationMinutes: { type: Number, default: 0 },
});

export default model<IWorkout>('Workout', workoutSchema);
