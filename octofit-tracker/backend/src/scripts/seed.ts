import { connectDatabase } from '../config/database';
import { User, Team, Activity, Workout } from '../models';

// Seed the octofit_db database with test data
async function run() {
  try {
    await connectDatabase();
    console.log('Seeding octofit_db with sample teams, users, activities, and workouts...');

    // Remove any existing test data so the seed can be run repeatedly.
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Create sample teams for leaderboard grouping.
    const teamA = await Team.create({ name: 'Team Alpha' });
    const teamB = await Team.create({ name: 'Team Beta' });

    // Create sample users assigned to teams.
    // Alice is on Team Alpha; Bob is on Team Beta.
    const alice = await User.create({ name: 'Alice', email: 'alice@example.com', team: teamA._id });
    const bob = await User.create({ name: 'Bob', email: 'bob@example.com', team: teamB._id });

    // Create activity history for users to support activity tracking and leaderboard stats.
    await Activity.create([
      { user: alice._id, type: 'running', durationMinutes: 30, date: new Date() },
      { user: bob._id, type: 'cycling', durationMinutes: 45, date: new Date() },
    ]);

    // Create sample workouts for workout suggestions.
    await Workout.create([
      { name: 'Morning Routine', exercises: ['pushups', 'squats'], durationMinutes: 20 },
      { name: 'Evening Cardio', exercises: ['running'], durationMinutes: 30 },
    ]);

    console.log('Seeding complete. Sample data inserted into octofit_db.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

run();
