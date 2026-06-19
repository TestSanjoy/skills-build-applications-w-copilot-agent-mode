import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectDatabase, MONGO_URI } from './config/database';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
// MONGO_URI is provided by `src/config/database.ts` and defaults to the
// `octofit_db` database on localhost:27017 when not specified via env.
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
    // When running in Codespaces, construct the preview URL using the CODESPACE_NAME
    // and port. The format is: https://{CODESPACE_NAME}-{PORT}.app.github.dev
    return `https://${CODESPACE_NAME}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
}

connectDatabase()
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
