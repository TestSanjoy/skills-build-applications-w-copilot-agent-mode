// API utility to construct base URL and fetch lists in a resilient way.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''
const PORT = 8000

function baseUrlFor(component) {
  if (codespaceName) {
    return `https://${codespaceName}-${PORT}.app.github.dev/api/${component}/`
  }
  return `http://localhost:${PORT}/api/${component}/`
}

async function fetchList(component, path = '', options = {}) {
  const url = baseUrlFor(component) + path
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`Fetch error ${res.status} for ${url}`)
  const body = await res.json()

  // Normalize responses: array OR { data: [...], ... } OR { items: [...] }
  if (Array.isArray(body)) return { items: body }
  if (body.data && Array.isArray(body.data)) return { items: body.data, meta: body.meta }
  if (body.items && Array.isArray(body.items)) return { items: body.items, meta: body.meta }

  // Fallback: if object with keys, attempt to find first array
  for (const k of Object.keys(body)) {
    if (Array.isArray(body[k])) return { items: body[k], meta: { key: k } }
  }

  // Otherwise return the raw body under items for UI to handle
  return { items: [], raw: body }
}

export { baseUrlFor, fetchList }
