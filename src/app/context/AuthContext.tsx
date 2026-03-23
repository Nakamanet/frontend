'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../lib/axios'
import { User } from '../types/auth'

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (token: string, userData: User) => void
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get<User>('/auth/me')
      setUser(data)
      setIsLoggedIn(true)
    } catch {
      setUser(null)
      setIsLoggedIn(false)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    }
  }, [])

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      queueMicrotask(() => fetchUser())
    }
  }, [fetchUser])

  const login = (token: string, userData: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider')
  return context
}
