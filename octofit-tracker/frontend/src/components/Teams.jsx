import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

export default function Teams() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchList('teams')
      .then((res) => setItems(res.items || []))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Teams</h2>
      {items.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {items.map((t) => (
            <li key={t._id || t.id}>{t.name}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
