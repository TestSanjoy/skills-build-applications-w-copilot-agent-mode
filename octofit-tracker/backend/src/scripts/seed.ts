/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function run() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  // Create teams
  const alpha = new Team({ name: 'Alpha Runners' });
  const beta = new Team({ name: 'Beta Crushers' });
  await alpha.save();
  await beta.save();

  // Create users
  const users = [
    new User({ name: 'Alice Johnson', email: 'alice@example.com', team: alpha._id }),
    new User({ name: 'Bob Smith', email: 'bob@example.com', team: alpha._id }),
    new User({ name: 'Carmen Reyes', email: 'carmen@example.com', team: beta._id })
  ];
  await Promise.all(users.map((u) => u.save()));

  // Update teams with members
  alpha.members = [users[0]._id, users[1]._id];
  beta.members = [users[2]._id];
  await alpha.save();
  await beta.save();

  // Create workouts
  const workouts = [
    new Workout({ name: 'Morning Run', description: 'Easy neighborhood run', durationMinutes: 30, difficulty: 'easy', exercises: ['run'] }),
    new Workout({ name: 'HIIT Blast', description: 'High-intensity interval training', durationMinutes: 20, difficulty: 'hard', exercises: ['burpees', 'sprints'] })
  ];
  await Promise.all(workouts.map((w) => w.save()));

  // Create activities
  const activities = [
    new Activity({ user: users[0]._id, team: alpha._id, type: 'run', durationMinutes: 35, distanceKm: 6.2, calories: 350 }),
    new Activity({ user: users[1]._id, team: alpha._id, type: 'cycle', durationMinutes: 45, distanceKm: 20.5, calories: 500 }),
    new Activity({ user: users[2]._id, team: beta._id, type: 'swim', durationMinutes: 30, distanceKm: 1.0, calories: 300 })
  ];
  await Promise.all(activities.map((a) => a.save()));

  // Create leaderboard entries (simple scores)
  const lb = [
    new Leaderboard({ subjectType: 'team', subject: alpha._id, score: 1200, rank: 1 }),
    new Leaderboard({ subjectType: 'team', subject: beta._id, score: 900, rank: 2 })
  ];
  await Promise.all(lb.map((l) => l.save()));

  console.log('Seeding complete.');
  console.log(`Created ${users.length} users, ${workouts.length} workouts, ${activities.length} activities.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
