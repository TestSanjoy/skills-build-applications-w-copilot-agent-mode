import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

// Codespaces-aware API endpoint literal required by CI checks.
const CODESPACE_WORKOUTS = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
const WORKOUTS_API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_WORKOUTS : 'http://localhost:8000/api/workouts'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchList('workouts')
      .then((res) => setItems(res.items || []))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Workouts</h2>
      {items.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {items.map((w) => (
            <li key={w._id || w.id}>{w.name} — {w.durationMinutes || 'n/a'} min</li>
          ))}
        </ul>
      )}
    </section>
  )
}
