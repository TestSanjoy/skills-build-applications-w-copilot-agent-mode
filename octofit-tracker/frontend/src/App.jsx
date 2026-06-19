import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'

function Nav() {
  return (
    <nav className="topnav">
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/activities">Activities</Link>
      <Link to="/workouts">Workouts</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  )
}

function Home() {
  return (
    <section id="center">
      <h1>OctoFit Tracker</h1>
      <p>Use the navigation to view users, activities, workouts, teams, and leaderboard.</p>
    </section>
  )
}

function App() {
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
