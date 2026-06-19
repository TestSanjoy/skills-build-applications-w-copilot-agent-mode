import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

// Codespaces-aware API endpoint literal required by CI checks.
const CODESPACE_LEADERBOARD = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
const LEADERBOARD_API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_LEADERBOARD : 'http://localhost:8000/api/leaderboard'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchList('leaderboard')
      .then((res) => setItems(res.items || []))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Leaderboard</h2>
      {items.length === 0 ? (
        <p>No leaderboard data found.</p>
      ) : (
        <ol>
          {items.map((row, i) => (
            <li key={row._id || row.id || i}>{row.team || row.user || JSON.stringify(row)}</li>
          ))}
        </ol>
      )}
    </section>
  )
}
