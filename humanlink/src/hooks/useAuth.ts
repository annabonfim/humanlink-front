import { useEffect, useState } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Authentication is now based on a token stored in localStorage with an expiration time
  useEffect(() => {
    const tokenData = localStorage.getItem('authToken')
    if (tokenData) {
      const { expiresAt } = JSON.parse(tokenData)
      const now = new Date().getTime()
      setIsAuthenticated(now < expiresAt)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  return { isAuthenticated }
}