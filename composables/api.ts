const BASE_URL = 'http://localhost:4000/api'

let cachedToken: string | null = null

export function setAuthToken(token: string | null) {
  cachedToken = token
  if (token) {
    localStorage.setItem('sentinelle_token', token)
  } else {
    localStorage.removeItem('sentinelle_token')
  }
}

export function getAuthToken(): string | null {
  if (cachedToken) return cachedToken
  const stored = localStorage.getItem('sentinelle_token')
  if (stored) {
    cachedToken = stored
  }
  return cachedToken
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}
