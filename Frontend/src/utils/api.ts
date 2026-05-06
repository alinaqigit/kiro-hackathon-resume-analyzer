const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function fetchWithAuth(
  endpoint: string,
  getToken: () => Promise<string | null>,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getToken()

  if (!token) {
    throw new Error('No auth token available — user may not be signed in')
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}
