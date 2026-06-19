import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

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
