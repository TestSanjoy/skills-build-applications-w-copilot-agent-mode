import mongoose from 'mongoose';

const DB_NAME = process.env.MONGO_DB_NAME || 'octofit_db';
const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGO_URI);
}

export { MONGO_URI, DB_NAME };
