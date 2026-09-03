'use client'
import { useState } from 'react'

export default function DashboardOrtu() {
  // Data dummy anak
  const anak = {
    nama: 'Andi Wijaya',
    kelas: '4B',
    nis: '2024001',
    waliKelas: 'Bu Ani',
  }

  // Statistik anak
  const stats = [
    { label: 'Rata-rata Nilai', value: '85', icon: '📊', color: 'bg-[#B8D4B8]', border: 'border-[#5B8C5A]' },
    { label: 'Materi Selesai', value: '18/23', icon: '📚', color: 'bg-[#B8D4E3]', border: 'border-[#6B9BB8]' },
    { label: 'Kuis Dikerjakan', value: '12', icon: '✏️', color: 'bg-[#F5E6C8]', border: 'border-[#D4B896]' },
    { label: 'Hari Belajar', value: '45', icon: '📅', color: 'bg-[#E8C4C4]', border: 'border-[#C97B7B]' },
  ]

  // Progress per mata pelajaran
  const mapelProgress = [
    { nama: 'Matematika', nilai: 88, status: 'Baik', warna: 'bg-[#5B8C5A]' },
    { nama: 'Bahasa Indonesia', nilai: 82, status: 'Baik', warna: 'bg-[#5B8C5A]' },
    { nama: 'IPAS', nilai: 90, status: 'Sangat Baik', warna: 'bg-[#5B8C5A]' },
    { nama: 'Bahasa Inggris', nilai: 75, status: 'Cukup', warna: 'bg-[#D4B896]' },
    { nama: 'Agama Katolik', nilai: 92, status: 'Sangat Baik', warna: 'bg-[#5B8C5A]' },
  ]

  // Notifikasi dari guru
  const notifikasi = [
    { dari: 'Bu Sari (IPAS)', pesan: 'Andi sangat aktif di kelas hari ini! 🌟', waktu: '2 jam lalu', tipe: 'positif' },
    { dari: 'Bu Ani (Wali Kelas)', pesan: 'Jangan lupa bayar uang kegiatan minggu depan.', waktu: '1 hari lalu', tipe: 'info' },
    { dari: 'Pak Toni (PJOK)', pesan: 'Andi perlu membawa sepatu olahraga besok.', waktu: '2 hari lalu', tipe: 'info' },
  ]

  // Tugas yang belum selesai
  const tugasBelum = [
    { mapel: 'Matematika', judul: 'Latihan Pecahan Bab 4', deadline: 'Besok', urgent: true },
    { mapel: 'Bahasa Indonesia', judul: 'Membaca Cerita Pendek', deadline: '3 hari lagi', urgent: false },
  ]

  const [tabAktif, setTabAktif] = useState<'ringkasan' | 'nilai' | 'notifikasi'>('ringkasan')

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#5B8C5A] rounded-full flex items-center justify-center border-2 border-[#D4B896]">
              <span className="text-[#D4B896] text-xl font-bold">SP</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#3D3D3D]">Portal Orang Tua</h1>
              <p className="text-xs text-[#7A7A7A]">SD Santo Paulus</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#7A7A7A] hover:text-[#3D3D3D]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C97B7B] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4B896] to-[#C4A886] rounded-full flex items-center justify-center text-white font-bold">
                O
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-[#3D3D3D]">Bapak/Ibu Wijaya</p>
                <p className="text-xs text-[#7A7A7A]">Orang Tua {anak.nama}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Anak */}
        <div className="bg-gradient-to-r from-[#5B8C5A] to-[#4A7349] rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Selamat Datang! 👋</h2>
              <p className="opacity-90">Pantau perkembangan belajar <strong>{anak.nama}</strong> di sini.</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span>Kelas: <strong>{anak.kelas}</strong></span>
                <span>Wali Kelas: <strong>{anak.waliKelas}</strong></span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90">Semester Ini</p>
              <p className="text-3xl font-bold">2026/2027</p>
            </div>
          </div>
        </div>

        {/* Tab Navigasi */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-[#E8E4DD] w-fit">
          <button
            onClick={() => setTabAktif('ringkasan')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tabAktif === 'ringkasan' ? 'bg-[#5B8C5A] text-white' : 'text-[#7A7A7A] hover:bg-[#F0EDE6]'
            }`}
          >
            📊 Ringkasan
          </button>
          <button
            onClick={() => setTabAktif('nilai')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tabAktif === 'nilai' ? 'bg-[#5B8C5A] text-white' : 'text-[#7A7A7A] hover:bg-[#F0EDE6]'
            }`}
          >
            📝 Nilai
          </button>
          <button
            onClick={() => setTabAktif('notifikasi')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tabAktif === 'notifikasi' ? 'bg-[#5B8C5A] text-white' : 'text-[#7A7A7A] hover:bg-[#F0EDE6]'
            }`}
          >
            🔔 Notifikasi
          </button>
        </div>

        {/* KONTEN TAB */}
        {tabAktif === 'ringkasan' && (
          <>
            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-white rounded-2xl shadow-sm p-6 border-l-4 ${stat.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#7A7A7A] mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#3D3D3D]">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tugas Belum Selesai */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
                <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">⚠️ Tugas Belum Selesai</h3>
                <div className="space-y-3">
                  {tugasBelum.map((tugas, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 ${
                      tugas.urgent ? 'border-[#C97B7B] bg-[#FFF5F5]' : 'border-[#D4B896] bg-[#FFFBF5]'
                    }`}>
                      <p className="font-semibold text-[#3D3D3D]">{tugas.judul}</p>
                      <p className="text-sm text-[#7A7A7A]">{tugas.mapel}</p>
                      <p className={`text-xs mt-2 font-semibold ${
                        tugas.urgent ? 'text-[#C97B7B]' : 'text-[#D4B896]'
                      }`}>
                        ⏰ Deadline: {tugas.deadline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pesan dari Guru */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
                <h3 className="text-lg font-bold text-[#3D3D3D] mb-4"> Pesan Terbaru dari Guru</h3>
                <div className="space-y-3">
                  {notifikasi.map((notif, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${
                      notif.tipe === 'positif' ? 'bg-[#B8D4B8] border-[#5B8C5A]' : 'bg-[#F0EDE6] border-[#E8E4DD]'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-[#3D3D3D]">{notif.dari}</p>
                        <p className="text-xs text-[#7A7A7A]">{notif.waktu}</p>
                      </div>
                      <p className="text-[#3D3D3D]">{notif.pesan}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tabAktif === 'nilai' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">📝 Nilai per Mata Pelajaran</h3>
            <div className="space-y-4">
              {mapelProgress.map((mapel, index) => (
                <div key={index} className="p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold text-[#3D3D3D]">{mapel.nama}</p>
                      <p className="text-sm text-[#7A7A7A]">{mapel.status}</p>
                    </div>
                    <p className="text-2xl font-bold text-[#5B8C5A]">{mapel.nilai}</p>
                  </div>
                  <div className="w-full bg-[#E8E4DD] rounded-full h-2">
                    <div 
                      className={`${mapel.warna} h-2 rounded-full transition-all`}
                      style={{ width: `${mapel.nilai}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#B8D4B8] rounded-xl border border-[#5B8C5A]">
              <p className="font-semibold text-[#3D5A3D]">💡 Tips untuk Orang Tua:</p>
              <p className="text-sm text-[#3D5A3D] mt-1">
                Dukung anak dengan membuat jadwal belajar rutin di rumah. 
                Untuk Bahasa Inggris (75), bisa ditambahkan latihan listening 15 menit/hari.
              </p>
            </div>
          </div>
        )}

        {tabAktif === 'notifikasi' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4"> Semua Notifikasi</h3>
            <div className="space-y-3">
              {notifikasi.map((notif, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD]">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    notif.tipe === 'positif' ? 'bg-[#5B8C5A]' : 'bg-[#6B9BB8]'
                  }`}>
                    {notif.dari.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#3D3D3D]">{notif.dari}</p>
                    <p className="text-[#3D3D3D] mt-1">{notif.pesan}</p>
                    <p className="text-xs text-[#7A7A7A] mt-2">{notif.waktu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}