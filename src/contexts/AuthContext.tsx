'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: { street: string; city: string; district: string; postalCode: string }
  preferences?: { newsletter: boolean; smsNotifications: boolean }
  createdAt: string
}

interface RegisterData { name: string; email: string; password: string; phone?: string }
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await response.json()
      if (response.ok && data.user) setUser(data.user)
      return { success: response.ok, message: data.message ?? (response.ok ? 'Giris basarili.' : 'Giris yapilamadi.') }
    } catch {
      return { success: false, message: 'Giris yapilamadi.' }
    } finally { setIsLoading(false) }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) })
      const data = await response.json()
      if (response.ok && data.user) setUser(data.user)
      return { success: response.ok, message: data.message ?? (response.ok ? 'Kayit basarili.' : 'Kayit olusturulamadi.') }
    } catch {
      return { success: false, message: 'Kayit olusturulamadi.' }
    } finally { setIsLoading(false) }
  }

  const logout = () => {
    setUser(null)
    void fetch('/api/auth/logout', { method: 'POST' })
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return { success: false, message: 'Kullanici bulunamadi.' }
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) })
      const data = await response.json()
      if (response.ok) setUser((current) => current ? { ...current, ...userData } : current)
      return { success: response.ok, message: data.message ?? (response.ok ? 'Profil guncellendi.' : 'Profil guncellenemedi.') }
    } catch {
      return { success: false, message: 'Profil guncellenemedi.' }
    } finally { setIsLoading(false) }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
