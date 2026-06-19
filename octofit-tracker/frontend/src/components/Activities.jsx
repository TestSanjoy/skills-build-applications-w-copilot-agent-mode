import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

export default function Activities() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
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
