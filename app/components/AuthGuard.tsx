'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sd_santo_paulus_auth')
    
    if (!saved) {
      // Belum login, redirect ke login
      router.push('/login')
      return
    }

    try {
      const user = JSON.parse(saved)
      
      if (!allowedRoles.includes(user.role)) {
        // Role tidak diizinkan, redirect ke halaman yang sesuai
        const routes: Record<string, string> = {
          admin: '/admin',
          guru: '/dashboard/guru',
          walikelas: '/dashboard/walikelas',
          siswa: '/dashboard/siswa',
          ortu: '/dashboard/ortu',
        }
        router.push(routes[user.role] || '/login')
        return
      }

      setIsAuthorized(true)
    } catch (e) {
      router.push('/login')
    }
  }, [router, allowedRoles])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-[#7A7A7A]">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}