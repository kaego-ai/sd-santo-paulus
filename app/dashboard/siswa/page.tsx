'use client'
import { useState } from 'react'

export default function DashboardSiswa() {
  const [activeTab, setActiveTab] = useState('beranda')

  // Data dummy siswa
  const siswa = {
    nama: 'Andi Wijaya',
    kelas: '4B',
    level: 12,
    levelName: 'Penjelajah Hebat',
    koin: 150,
    streak: 5,
    xp: 450,
    xpNext: 600,
  }

  // Progress per mata pelajaran
  const mapelProgress = [
    { nama: 'Matematika', progress: 85, warna: 'bg-red-600', icon: '🧮' },
    { nama: 'Bahasa Indonesia', progress: 72, warna: 'bg-green-600', icon: '📖' },
    { nama: 'IPAS', progress: 90, warna: 'bg-blue-600', icon: '🔬' },
    { nama: 'Bahasa Inggris', progress: 68, warna: 'bg-purple-600', icon: '🌍' },
    { nama: 'Agama Katolik', progress: 95, warna: 'bg-yellow-500', icon: '✝️' },
  ]

  // Tugas hari ini
  const tugasHariIni = [
    { mapel: 'Matematika', judul: 'Kuis Pecahan Bab 3', deadline: '14:00', status: 'belum', warna: 'border-red-500' },
    { mapel: 'Bahasa Indonesia', judul: 'Tulis Cerita Pendek', deadline: '16:30', status: 'belum', warna: 'border-green-500' },
    { mapel: 'IPAS', judul: 'Eksperimen Fotosintesis', deadline: 'Besok', status: 'belum', warna: 'border-blue-500' },
  ]

  // Badge/Pencapaian
  const badges = [
    { nama: 'Penjelajah Cerdas', icon: '🏅', warna: 'bg-yellow-100 border-yellow-400' },
    { nama: 'Pembaca Ulung', icon: '📚', warna: 'bg-green-100 border-green-400' },
    { nama: 'Ahli Hitung', icon: '🧮', warna: 'bg-red-100 border-red-400' },
    { nama: 'Rajin Sekali', icon: '⭐', warna: 'bg-purple-100 border-purple-400' },
  ]

  // Jadwal hari ini
  const jadwal = [
    { waktu: '08:00-09:30', mapel: 'Matematika', guru: 'Bu Sari' },
    { waktu: '09:45-11:15', mapel: 'IPAS', guru: 'Pak Toni' },
    { waktu: '13:00-14:30', mapel: 'Bahasa Indonesia', guru: 'Bu Ani' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header/Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center border-2 border-yellow-400">
              <span className="text-yellow-400 text-xl font-bold">SP</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Buku Digital</h1>
              <p className="text-xs text-gray-500">SD Santo Paulus</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-full">
              <span className="text-yellow-600">🪙</span>
              <span className="font-bold text-yellow-700">{siswa.koin} koin</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-red-100 px-3 py-2 rounded-full">
              <span className="text-red-600">🔥</span>
              <span className="font-bold text-red-700">{siswa.streak} hari</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold">
                {siswa.nama.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{siswa.nama}</p>
                <p className="text-xs text-gray-500">Kelas {siswa.kelas}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Selamat Datang, {siswa.nama.split(' ')[0]}! 👋</h2>
            <p className="text-green-100 mb-4">Kamu sudah belajar {siswa.streak} hari berturut-turut. Luar biasa!</p>
            
            {/* Level Progress */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Level {siswa.level} - {siswa.levelName}</span>
                <span className="text-sm">{siswa.xp}/{siswa.xpNext} XP</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div 
                  className="bg-yellow-400 h-3 rounded-full transition-all"
                  style={{ width: `${(siswa.xp / siswa.xpNext) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri - Progress Mapel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Progress Mata Pelajaran */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📊 Progress Mata Pelajaran
              </h3>
              <div className="space-y-4">
                {mapelProgress.map((mapel, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{mapel.icon}</span>
                        <span className="font-semibold text-gray-700">{mapel.nama}</span>
                      </div>
                      <span className="font-bold text-gray-800">{mapel.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${mapel.warna} h-3 rounded-full transition-all`}
                        style={{ width: `${mapel.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tugas Hari Ini */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                 Tugas Hari Ini
              </h3>
              <div className="space-y-3">
                {tugasHariIni.map((tugas, index) => (
                  <div 
                    key={index} 
                    className={`border-l-4 ${tugas.warna} bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition cursor-pointer`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{tugas.judul}</p>
                        <p className="text-sm text-gray-500">{tugas.mapel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700">{tugas.deadline}</p>
                        <button className="mt-1 text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700">
                          Kerjakan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Badge & Jadwal */}
          <div className="space-y-6">
            
            {/* Badge/Pencapaian */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🏆 Pencapaian
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div 
                    key={index} 
                    className={`${badge.warna} border-2 rounded-xl p-3 text-center hover:scale-105 transition cursor-pointer`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <p className="text-xs font-semibold text-gray-700">{badge.nama}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jadwal Hari Ini */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📅 Jadwal Hari Ini
              </h3>
              <div className="space-y-3">
                {jadwal.map((item, index) => (
                  <div key={index} className="border-l-4 border-green-600 pl-3">
                    <p className="text-xs text-gray-500">{item.waktu}</p>
                    <p className="font-semibold text-gray-800">{item.mapel}</p>
                    <p className="text-sm text-gray-600">{item.guru}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-3">⚡ Aksi Cepat</h3>
              <div className="space-y-2">
                <button className="w-full bg-white/30 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/40 transition">
                  📚 Baca Materi
                </button>
                <button className="w-full bg-white/30 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/40 transition">
                  🎮 Main Kuis
                </button>
                <button className="w-full bg-white/30 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/40 transition">
                  📊 Lihat Rapor
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}