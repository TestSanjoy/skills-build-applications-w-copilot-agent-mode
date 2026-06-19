import { Schema, model, Types } from 'mongoose';

interface IActivity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model<IActivity>('Activity', activitySchema);
