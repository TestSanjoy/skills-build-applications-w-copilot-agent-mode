import { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  team?: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export default model<IUser>('User', userSchema);
