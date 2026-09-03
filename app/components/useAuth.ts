'use client'
import { useState, useEffect } from 'react'

export type UserRole = 'admin' | 'guru' | 'walikelas' | 'siswa' | 'ortu'

export interface User {
  email: string
  nama: string
  role: UserRole
  subNama?: string
}

const AUTH_KEY = 'sd_santo_paulus_auth'

// Default users untuk demo
const defaultUsers: (User & { password: string })[] = [
  { email: 'admin@sdsp.sch.id', password: 'admin123', nama: 'Administrator', role: 'admin', subNama: 'SD Santo Paulus' },
  { email: 'guru@sdsp.sch.id', password: 'guru123', nama: 'Bu Sari Wijaya', role: 'guru', subNama: 'Guru IPAS' },
  { email: 'walikelas@sdsp.sch.id', password: 'walikelas123', nama: 'Bu Ani Susanti', role: 'walikelas', subNama: 'Wali Kelas 4B' },
  { email: 'siswa@sdsp.sch.id', password: 'siswa123', nama: 'Andi Wijaya', role: 'siswa', subNama: 'Kelas 4B' },
  { email: 'ortu@sdsp.sch.id', password: 'ortu123', nama: 'Bapak Wijaya', role: 'ortu', subNama: 'Orang Tua Andi' },
]

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string): { success: boolean; message: string } => {
    const found = defaultUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (found) {
      const userData: User = {
        email: found.email,
        nama: found.nama,
        role: found.role,
        subNama: found.subNama,
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData))
      setUser(userData)
      return { success: true, message: 'Login berhasil!' }
    }

    return { success: false, message: 'Email atau password salah!' }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    setUser(null)
    window.location.href = '/login'
  }

  const isAuthenticated = () => user !== null

  const hasRole = (roles: UserRole[]) => {
    return user ? roles.includes(user.role) : false
  }

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  }
}