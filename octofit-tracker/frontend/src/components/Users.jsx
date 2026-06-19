import { useEffect, useState } from 'react'
import { fetchList } from '../utils/api'

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
