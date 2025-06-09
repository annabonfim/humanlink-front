'use client'

export function setAuthToken(token: string) {
  const expiry = new Date().getTime() + 24 * 60 * 60 * 1000 // 1 dia em ms
  const tokenData = { token, expiry }
  localStorage.setItem('authToken', JSON.stringify(tokenData))
}

export function getAuthToken(): string | null {
  const item = localStorage.getItem('authToken')
  if (!item) return null

  try {
    const { token, expiry } = JSON.parse(item)
    if (new Date().getTime() > expiry) {
      localStorage.removeItem('authToken')
      return null
    }
    return token
  } catch {
    localStorage.removeItem('authToken')
    return null
  }
}

export function clearAuthToken() {
  localStorage.removeItem('authToken')
}