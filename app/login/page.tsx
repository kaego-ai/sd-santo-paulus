'use client'
import { useState } from 'react'
import { useAuth } from '@/app/components/useAuth'

export default function HalamanLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email dan password wajib diisi!')
      return
    }

    const result = login(email, password)
    if (result.success) {
      // Redirect berdasarkan role
      const saved = localStorage.getItem('sd_santo_paulus_auth')
      if (saved) {
        const user = JSON.parse(saved)
        const routes: Record<string, string> = {
          admin: '/admin',
          guru: '/dashboard/guru',
          walikelas: '/dashboard/walikelas',
          siswa: '/dashboard/siswa',
          ortu: '/dashboard/ortu',
        }
        window.location.href = routes[user.role] || '/dashboard/guru'
      }
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5B8C5A] via-[#4A7349] to-[#3D5A3D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Judul */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <span className="text-4xl"></span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SD Santo Paulus</h1>
          <p className="text-white/80">Platform Buku Digital</p>
        </div>

        {/* Form Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#3D3D3D] mb-2 text-center">
            Selamat Datang
          </h2>
          <p className="text-[#7A7A7A] text-center mb-6">
            Silakan login untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">
                📧 Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sdsp.sch.id"
                className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 pr-12 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#5B8C5A]"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                ❌ {error}
              </div>
            )}

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-[#5B8C5A] to-[#4A7349] text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
            >
              🔐 Masuk
            </button>
          </form>

          {/* Info Akun Demo */}
          <div className="mt-6 pt-6 border-t border-[#E8E4DD]">
            <p className="text-xs font-semibold text-[#7A7A7A] mb-3 text-center">
              📋 AKUN DEMO UNTUK TESTING
            </p>
            <div className="space-y-2 text-xs">
              {[
                { role: 'Admin', email: 'admin@sdsp.sch.id', pass: 'admin123', color: 'bg-purple-100 text-purple-700' },
                { role: 'Guru', email: 'guru@sdsp.sch.id', pass: 'guru123', color: 'bg-green-100 text-green-700' },
                { role: 'Wali Kelas', email: 'walikelas@sdsp.sch.id', pass: 'walikelas123', color: 'bg-blue-100 text-blue-700' },
                { role: 'Siswa', email: 'siswa@sdsp.sch.id', pass: 'siswa123', color: 'bg-yellow-100 text-yellow-700' },
                { role: 'Orang Tua', email: 'ortu@sdsp.sch.id', pass: 'ortu123', color: 'bg-pink-100 text-pink-700' },
              ].map((acc) => (
                <div
                  key={acc.role}
                  className={`${acc.color} rounded-lg p-2 cursor-pointer hover:opacity-80 transition`}
                  onClick={() => {
                    setEmail(acc.email)
                    setPassword(acc.pass)
                  }}
                >
                  <div className="font-semibold">{acc.role}</div>
                  <div className="opacity-75">{acc.email} / {acc.pass}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#7A7A7A] text-center mt-3">
               Klik salah satu akun untuk auto-fill
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/60 text-center text-sm mt-6">
          © 2026 SD Santo Paulus. All rights reserved.
        </p>
      </div>
    </div>
  )
}