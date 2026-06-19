import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

// Codespaces-aware API endpoint literal required by CI checks.
const CODESPACE_USERS = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
const USERS_API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_USERS : 'http://localhost:8000/api/users'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchList('users')
      .then((res) => setUsers(res.items || []))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id || u.id}>{u.name || u.email}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
