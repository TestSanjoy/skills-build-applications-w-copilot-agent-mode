import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  subjectType: 'user' | 'team';
  subject: mongoose.Types.ObjectId;
  score: number;
  rank?: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  subjectType: { type: String, enum: ['user', 'team'], required: true },
  subject: { type: Schema.Types.ObjectId, required: true, refPath: 'subjectType' },
  score: { type: Number, required: true },
  rank: { type: Number }
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
