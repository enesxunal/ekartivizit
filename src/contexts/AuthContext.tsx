'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { emailTemplates } from '@/lib/email'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    district: string
    postalCode: string
  }
  preferences?: {
    newsletter: boolean
    smsNotifications: boolean
  }
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>
  isAuthenticated: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // LocalStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    const savedUser = localStorage.getItem('ekartvizit-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Kullanıcı verisi yüklenirken hata:', error)
        localStorage.removeItem('ekartvizit-user')
      }
    }
    setIsLoading(false)
  }, [])

  // Kullanıcı değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (user) {
      localStorage.setItem('ekartvizit-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('ekartvizit-user')
    }
  }, [user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo kullanıcılar
    const demoUsers = [
      {
        id: '1',
        email: 'demo@ekartvizit.com',
        password: '123456',
        name: 'Demo Kullanıcı',
        phone: '0555 123 45 67',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'test@test.com',
        password: 'test123',
        name: 'Test Kullanıcı',
        phone: '0555 987 65 43',
        createdAt: new Date().toISOString()
      }
    ]

    const foundUser = demoUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsLoading(false)
      return { success: true, message: 'Giriş başarılı!' }
    }

    setIsLoading(false)
    return { success: false, message: 'E-posta veya şifre hatalı!' }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // E-posta kontrolü (basit)
    if (userData.email === 'demo@ekartvizit.com') {
      setIsLoading(false)
      return { success: false, message: 'Bu e-posta adresi zaten kullanımda!' }
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      createdAt: new Date().toISOString(),
      preferences: {
        newsletter: true,
        smsNotifications: false
      }
    }

    // Hoş geldin e-postası gönder
    try {
      const welcomeEmailTemplate = emailTemplates.userRegistration(userData.name, userData.email)
      
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userData.email,
          template: welcomeEmailTemplate
        })
      })
    } catch (emailError) {
      console.error('Hoş geldin e-postası gönderme hatası:', emailError)
      // E-posta hatası kayıt işlemini durdurmasın
    }

    setUser(newUser)
    setIsLoading(false)
    return { success: true, message: 'Kayıt başarılı! Hoş geldiniz! E-posta adresinizi kontrol edin.' }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return { success: false, message: 'Kullanıcı bulunamadı!' }
    
    setIsLoading(true)
    
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    setIsLoading(false)
    
    return { success: true, message: 'Profil başarıyla güncellendi!' }
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 