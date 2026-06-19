import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

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
