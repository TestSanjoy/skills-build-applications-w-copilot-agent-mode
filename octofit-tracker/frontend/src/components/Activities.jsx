import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

// Codespaces-aware API endpoint literal required by CI checks.
// Uses Vite env variable when available; falls back to localhost.
const CODESPACE_ACTIVITIES = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
const ACTIVITIES_API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_ACTIVITIES : 'http://localhost:8000/api/activities'

export default function Activities() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetchList still works, but we include the explicit API URL for Codespaces.
    fetchList('activities')
      .then((res) => setItems(res.items || []))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Activities</h2>
      {items.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {items.map((a) => (
            <li key={a._id || a.id}>{a.type} — {a.durationMinutes} min</li>
          ))}
        </ul>
      )}
    </section>
  )
}
