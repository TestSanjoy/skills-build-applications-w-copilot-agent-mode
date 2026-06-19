import { Schema, model } from 'mongoose';

interface ITeam {
  name: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
});

export default model<ITeam>('Team', teamSchema);
