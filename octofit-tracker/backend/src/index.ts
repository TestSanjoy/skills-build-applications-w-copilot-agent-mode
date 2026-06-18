import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME || '';

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'OctoFit Tracker backend is running.' });
});

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Compute a Codespaces-aware base URL for convenience when running inside Codespaces
function computeBaseUrl(): string {
  if (CODESPACE_NAME) {
    // When running in Codespaces, a preview URL is usually available. We construct
    // a readable base URL using the CODESPACE_NAME and the port. This string is
    // intended as a helpful hint and can be adjusted to match your Codespaces
    // preview domain if needed.
    return `https://${CODESPACE_NAME}-${PORT}.githubpreview.dev`;
  }
  return `http://localhost:${PORT}`;
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB on', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Backend server listening on ${computeBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
