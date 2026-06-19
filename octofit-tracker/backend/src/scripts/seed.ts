import { connectDatabase } from '../config/database';
import { User, Team, Activity, Workout } from '../models';

async function run() {
  try {
    await connectDatabase();
    console.log('Seeding database...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Create teams
    const teamA = await Team.create({ name: 'Team Alpha' });
    const teamB = await Team.create({ name: 'Team Beta' });

    // Create users
    const alice = await User.create({ name: 'Alice', email: 'alice@example.com', team: teamA._id });
    const bob = await User.create({ name: 'Bob', email: 'bob@example.com', team: teamB._id });

    // Create activities
    await Activity.create([
      { user: alice._id, type: 'running', durationMinutes: 30, date: new Date() },
      { user: bob._id, type: 'cycling', durationMinutes: 45, date: new Date() },
    ]);

    // Create workouts
    await Workout.create([
      { name: 'Morning Routine', exercises: ['pushups', 'squats'], durationMinutes: 20 },
      { name: 'Evening Cardio', exercises: ['running'], durationMinutes: 30 },
    ]);

    console.log('Seeding complete.No error found');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

run();
