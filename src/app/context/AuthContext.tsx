'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../lib/axios'
import { User } from '../types/auth'

interface AuthContextType {
  isLoggedIn: boolean
  isAuthLoading: boolean
  hasStoredSession: boolean
  user: User | null
  login: (token: string, userData: User, expiresIn: number) => void
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function isAuthError(err: unknown): boolean {
  // only treat genuine 401/403 responses as "token is invalid" —
  // network errors, aborted requests, timeouts, etc. should NOT clear the session
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    (err as any).response?.status !== undefined &&
    [401, 403].includes((err as any).response.status)
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [hasStoredSession, setHasStoredSession] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get<User>('/auth/me')
      setUser(data)
      setIsLoggedIn(true)
    } catch (err) {
      setUser(null)
      setIsLoggedIn(false)

      // only wipe the stored token if the server genuinely rejected it —
      // don't clear it for network blips or requests aborted by rapid navigation
      if (typeof window !== 'undefined' && isAuthError(err)) {
        localStorage.removeItem('token')
        localStorage.removeItem('expires_at')
      }
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('token')
    const expires_at = localStorage.getItem('expires_at')
    setHasStoredSession(!!token)
    if (!token) {
      setIsAuthLoading(false)
      return
    }

    const isExpired = expires_at ? Date.now() > Number(expires_at) : false

    if (isExpired) {
      api
        .post('/auth/refresh')
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('expires_at', String(Date.now() + data.expires_in * 1000))
          fetchUser()
        })
        .catch((err) => {
          // same principle: only clear on a genuine auth rejection
          if (isAuthError(err)) {
            localStorage.removeItem('token')
            localStorage.removeItem('expires_at')
          }
          setIsAuthLoading(false)
        })
    } else {
      queueMicrotask(() => fetchUser())
    }
  }, [fetchUser])

  const login = (token: string, userData: User, expiresIn: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      localStorage.setItem('expires_at', String(Date.now() + expiresIn * 1000))
    }
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('expires_at')
    }
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthLoading, hasStoredSession, user, login, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider')
  return context
}
