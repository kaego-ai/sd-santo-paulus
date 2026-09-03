'use client'
import { useEffect, useState } from 'react'

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    totalGuru: 0,
    totalSiswa: 0,
    totalKelas: 0,
    totalBab: 0,
  })

  useEffect(() => {
    // Load data dari localStorage
    const guruData = localStorage.getItem('sd_santo_paulus_guru_data')
    const siswaData = localStorage.getItem('sd_santo_paulus_siswa_data')
    const babData = localStorage.getItem('sd_santo_paulus_bab_data')

    try {
      const guruList = guruData ? JSON.parse(guruData) : []
      const siswaList = siswaData ? JSON.parse(siswaData) : []
      const babList = babData ? JSON.parse(babData) : []

      const kelasSet = new Set(siswaList.map((s: any) => s.kelas))

      setStats({
        totalGuru: guruList.length,
        totalSiswa: siswaList.length,
        totalKelas: kelasSet.size,
        totalBab: babList.length,
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  const menuAdmin = [
    { label: 'Kelola Guru', icon: '‍🏫', href: '/admin/guru', color: 'from-green-500 to-green-600', desc: 'Tambah, edit, hapus data guru' },
    { label: 'Kelola Siswa', icon: '👦', href: '/admin/siswa', color: 'from-blue-500 to-blue-600', desc: 'Import/export data siswa via CSV' },
    { label: 'Kelola Kelas', icon: '🏫', href: '/admin/kelas', color: 'from-purple-500 to-purple-600', desc: 'Atur kelas dan wali kelas' },
    { label: 'Pengumuman', icon: '📢', href: '#', color: 'from-yellow-500 to-yellow-600', desc: 'Buat pengumuman sekolah' },
    { label: 'Laporan', icon: '📊', href: '#', color: 'from-pink-500 to-pink-600', desc: 'Laporan aktivitas sistem' },
    { label: 'Pengaturan', icon: '⚙️', href: '/admin/pengaturan', color: 'from-gray-500 to-gray-600', desc: 'Konfigurasi aplikasi' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#3D3D3D]">🏠 Dashboard Admin</h1>
            <p className="text-[#7A7A7A] mt-1">Kelola seluruh sistem SD Santo Paulus</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#3D3D3D]">Administrator</p>
              <p className="text-xs text-[#7A7A7A]">SD Santo Paulus</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C5A] to-[#4A7349] rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Banner Info */}
      <div className="bg-gradient-to-r from-[#5B8C5A] to-[#4A7349] rounded-2xl p-6 text-white mb-6">
        <h2 className="text-xl font-bold mb-2">💡 Selamat Datang, Admin!</h2>
        <p className="opacity-90 text-sm">
          Anda memiliki akses penuh untuk mengelola seluruh sistem. Gunakan menu di bawah untuk navigasi cepat.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">👨‍🏫</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">Aktif</span>
          </div>
          <p className="text-sm text-[#7A7A7A]">Total Guru</p>
          <p className="text-3xl font-bold text-[#3D3D3D]">{stats.totalGuru}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">👦</span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">Terdaftar</span>
          </div>
          <p className="text-sm text-[#7A7A7A]">Total Siswa</p>
          <p className="text-3xl font-bold text-[#3D3D3D]">{stats.totalSiswa}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🏫</span>
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">Kelas</span>
          </div>
          <p className="text-sm text-[#7A7A7A]">Total Kelas</p>
          <p className="text-3xl font-bold text-[#3D3D3D]">{stats.totalKelas}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl"></span>
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">Bab</span>
          </div>
          <p className="text-sm text-[#7A7A7A]">Total Bab Materi</p>
          <p className="text-3xl font-bold text-[#3D3D3D]">{stats.totalBab}</p>
        </div>
      </div>

      {/* Menu Cepat */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6 mb-6">
        <h2 className="text-xl font-bold text-[#3D3D3D] mb-4">⚡ Menu Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuAdmin.map((menu, i) => (
            <a
              key={i}
              href={menu.href}
              className={`bg-gradient-to-br ${menu.color} rounded-xl p-5 text-white hover:scale-105 transition-transform shadow-md`}
            >
              <div className="text-4xl mb-2">{menu.icon}</div>
              <h3 className="font-bold text-lg mb-1">{menu.label}</h3>
              <p className="text-sm opacity-90">{menu.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Info Sistem */}
      <div className="bg-[#B8D4E3] border-2 border-[#6B9BB8] rounded-2xl p-5 text-[#3D5A7A]">
        <h3 className="font-bold mb-2">ℹ️ Informasi Sistem</h3>
        <ul className="space-y-1 text-sm">
          <li>✅ Versi Aplikasi: 1.0.0</li>
          <li>✅ Database: LocalStorage (akan diupgrade ke Supabase)</li>
          <li>✅ AI Engine: Google Gemini 2.0 Flash</li>
          <li>✅ Framework: Next.js 16.3.4</li>
          <li>📅 Tahun Ajaran: 2026/2027</li>
        </ul>
      </div>
    </div>
  )
}