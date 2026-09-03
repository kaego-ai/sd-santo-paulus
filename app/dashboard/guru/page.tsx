'use client'
import { useState } from 'react'

export default function DashboardGuru() {
  const [selectedKelas, setSelectedKelas] = useState(['4A', '4B', '5A', '5B', '5C'])

  // Data dummy guru
  const guru = {
    nama: 'Bu Sari Wijaya',
    nip: '198505122010012001',
    kelas: ['4A', '4B', '5A', '5B', '5C'],
    mapel: 'IPAS',
  }

  // Statistik
  const stats = [
    { label: 'Kelas Aktif', value: 5, icon: '🏫', color: 'bg-[#B8D4B8]', border: 'border-[#5B8C5A]' },
    { label: 'Total Siswa', value: 150, icon: '👥', color: 'bg-[#B8D4E3]', border: 'border-[#6B9BB8]' },
    { label: 'Materi Diupload', value: 23, icon: '📄', color: 'bg-[#F5E6C8]', border: 'border-[#D4B896]' },
    { label: 'Soal Dibuat', value: 156, icon: '📝', color: 'bg-[#E8C4C4]', border: 'border-[#C97B7B]' },
  ]

  // Kelas yang diajar
  const kelasData = [
    { nama: '4A', siswa: 30, rataRata: 85, materi: 12 },
    { nama: '4B', siswa: 30, rataRata: 82, materi: 12 },
    { nama: '5A', siswa: 30, rataRata: 88, materi: 15 },
    { nama: '5B', siswa: 30, rataRata: 79, materi: 15 },
    { nama: '5C', siswa: 30, rataRata: 90, materi: 15 },
  ]

  // Aktivitas terbaru
  const aktivitasTerbaru = [
    { siswa: 'Andi Wijaya', kelas: '5A', aktivitas: 'Submit tugas IPAS Bab 3', waktu: '10 menit lalu', status: 'Selesai' },
    { siswa: 'Budi Santoso', kelas: '5B', aktivitas: 'Kerjakan kuis Fotosintesis', waktu: '25 menit lalu', status: 'Selesai' },
    { siswa: 'Citra Lestari', kelas: '4A', aktivitas: 'Baca materi Sistem Pernapasan', waktu: '1 jam lalu', status: 'Berlangsung' },
    { siswa: 'Dewi Kusuma', kelas: '5C', aktivitas: 'Submit tugas IPAS Bab 3', waktu: '2 jam lalu', status: 'Perlu Dicek' },
  ]

  const toggleKelas = (kelas: string) => {
    setSelectedKelas(prev => 
      prev.includes(kelas) ? prev.filter(k => k !== kelas) : [...prev, kelas]
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#5B8C5A] rounded-full flex items-center justify-center border-2 border-[#D4B896]">
              <span className="text-[#D4B896] text-xl font-bold">SP</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#3D3D3D]">Panel Guru</h1>
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
              <div className="w-10 h-10 bg-gradient-to-br from-[#5B8C5A] to-[#4A7349] rounded-full flex items-center justify-center text-white font-bold">
                {guru.nama.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-[#3D3D3D]">{guru.nama}</p>
                <p className="text-xs text-[#7A7A7A]">{guru.mapel}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upload Materi Baru */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
              <h3 className="text-xl font-bold text-[#3D3D3D] mb-4 flex items-center gap-2">
                 Upload Materi Baru
              </h3>
              
              {/* Drag & Drop Zone */}
              <div className="border-2 border-dashed border-[#D4D0C8] rounded-2xl p-8 text-center hover:border-[#5B8C5A] transition cursor-pointer bg-[#FAFAF8]">
                <div className="text-5xl mb-4">☁️</div>
                <p className="text-lg font-semibold text-[#3D3D3D] mb-2">
                  Seret & lepas file atau klik untuk memilih
                </p>
                <p className="text-sm text-[#7A7A7A]">
                  PDF, Video, PPT, Gambar (Max 50 MB)
                </p>
                <button className="mt-4 bg-[#5B8C5A] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#4A7349] transition">
                  Pilih File
                </button>
              </div>

              {/* ✅ PERBAIKAN: Tombol ke Manajemen Materi */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => window.location.href = '/dashboard/guru/materi'}
                  className="flex-1 bg-[#5B8C5A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4A7349] transition flex items-center justify-center gap-2"
                >
                   Kelola Bab & Materi
                </button>
                <button
                  onClick={() => alert('Fitur upload cepat')}
                  className="flex-1 bg-[#F0EDE6] text-[#3D3D3D] px-6 py-3 rounded-xl font-semibold hover:bg-[#E8E4DD] transition flex items-center justify-center gap-2"
                >
                   Upload File Cepat
                </button>
              </div>

              {/* Pilih Kelas Tujuan */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-3">
                  Publikasi ke Kelas:
                </label>
                <div className="flex flex-wrap gap-3">
                  {guru.kelas.map((k, index) => {
                    const isSelected = selectedKelas.includes(k)
                    return (
                      <button
                        key={index}
                        onClick={() => toggleKelas(k)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-semibold ${
                          isSelected
                            ? 'bg-[#5B8C5A] text-white shadow-sm'
                            : 'bg-[#F0EDE6] text-[#3D3D3D] hover:bg-[#E8E4DD]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'bg-white border-white' : 'bg-white border-[#B8B4AC]'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-[#5B8C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span>Kelas {k}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          {/* Daftar Materi & Bab */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3D3D3D]">📚 Materi & Bab yang Sudah Diupload</h3>
              <button
                onClick={() => window.location.href = '/dashboard/guru/materi'}
                className="text-sm text-[#5B8C5A] font-semibold hover:underline"
              >
                Kelola Semua →
              </button>
            </div>

            {/* List Bab */}
            <div className="space-y-3">
              {[
                { bab: 1, judul: 'Pendahuluan', status: 'published', updated: '1 Sep 2026' },
                { bab: 2, judul: 'Organ Pernapasan Manusia', status: 'published', updated: '1 Sep 2026' },
                { bab: 3, judul: 'Proses Pernapasan', status: 'draft', updated: '-' },
                { bab: 4, judul: 'Pernapasan pada Hewan', status: 'draft', updated: '-' },
                { bab: 5, judul: 'Gangguan Sistem Pernapasan', status: 'draft', updated: '-' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD] hover:border-[#5B8C5A] transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#5B8C5A] text-white rounded-full flex items-center justify-center font-bold">
                      {item.bab}
                    </div>
                    <div>
                      <p className="font-bold text-[#3D3D3D]">{item.judul}</p>
                      <p className="text-sm text-[#7A7A7A]">Update: {item.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      item.status === 'published'
                        ? 'bg-[#B8D4B8] text-[#3D5A3D]'
                        : 'bg-[#F5E6C8] text-[#7A5A2A]'
                    }`}>
                      {item.status === 'published' ? '✓ Published' : '📝 Draft'}
                    </span>
                    <button
                      onClick={() => window.location.href = `/materi/${item.bab}`}
                      className="p-2 text-[#5B8C5A] hover:bg-[#B8D4B8] rounded-lg transition"
                      title="Lihat Materi"
                    >
                      ️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-4 pt-4 border-t border-[#E8E4DD] flex items-center justify-between text-sm">
              <span className="text-[#7A7A7A]">Total: <strong>5 Bab</strong></span>
              <span className="text-[#7A7A7A]">Published: <strong className="text-[#5B8C5A]">2</strong></span>
              <span className="text-[#7A7A7A]">Draft: <strong className="text-[#D4B896]">3</strong></span>
            </div>
          </div>
            {/* Kinerja Kelas */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
              <h3 className="text-xl font-bold text-[#3D3D3D] mb-4 flex items-center gap-2">
                📊 Kinerja Kelas Minggu Ini
              </h3>
              <div className="space-y-3">
                {kelasData.map((kelas, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C5A] to-[#4A7349] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {kelas.nama.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#3D3D3D]">Kelas {kelas.nama}</p>
                        <p className="text-sm text-[#7A7A7A]">{kelas.siswa} siswa • {kelas.materi} materi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#5B8C5A]">{kelas.rataRata}%</p>
                      <p className="text-xs text-[#7A7A7A]">Rata-rata</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
              <h3 className="text-xl font-bold text-[#3D3D3D] mb-4 flex items-center gap-2">
                 Aktivitas Terbaru
              </h3>
              <div className="space-y-3">
                {aktivitasTerbaru.map((aktivitas, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#FAFAF8] rounded-xl hover:bg-[#F0EDE6] transition border border-[#E8E4DD]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6B9BB8] to-[#5A8AA7] rounded-full flex items-center justify-center text-white font-bold">
                        {aktivitas.siswa.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#3D3D3D]">{aktivitas.siswa}</p>
                        <p className="text-sm text-[#7A7A7A]">{aktivitas.aktivitas}</p>
                        <p className="text-xs text-[#9A9A9A]">{aktivitas.waktu} • Kelas {aktivitas.kelas}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      aktivitas.status === 'Selesai' ? 'bg-[#B8D4B8] text-[#3D5A3D]' :
                      aktivitas.status === 'Berlangsung' ? 'bg-[#F5E6C8] text-[#7A5A2A]' :
                      'bg-[#E8C4C4] text-[#5A3D3D]'
                    }`}>
                      {aktivitas.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            
            {/* Buat Soal Baru */}
            <div className="bg-gradient-to-br from-[#C97B7B] to-[#B86A6A] rounded-2xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-bold mb-4">📝 Buat Soal Baru</h3>
              <div className="space-y-2">
                <button className="w-full bg-white/25 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/35 transition text-left px-4">
                  Pilihan Ganda
                </button>
                <button className="w-full bg-white/25 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/35 transition text-left px-4">
                  Uraian/Essay
                </button>
                <button className="w-full bg-white/25 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/35 transition text-left px-4">
                  Drag & Drop
                </button>
                <button className="w-full bg-white/25 backdrop-blur-sm rounded-xl py-3 font-semibold hover:bg-white/35 transition text-left px-4">
                  Menjodohkan
                </button>
              </div>
            </div>

            {/* Tindakan Cepat */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
              <h3 className="text-lg font-bold text-[#3D3D3D] mb-4"> Tindakan Cepat</h3>
              <div className="space-y-2">
                <button className="w-full bg-[#F0EDE6] rounded-xl py-3 font-semibold text-[#3D3D3D] hover:bg-[#E8E4DD] transition text-left px-4">
                  📢 Buat Pengumuman
                </button>
                <button className="w-full bg-[#F0EDE6] rounded-xl py-3 font-semibold text-[#3D3D3D] hover:bg-[#E8E4DD] transition text-left px-4">
                   Kirim Pesan Massal
                </button>
                <button className="w-full bg-[#F0EDE6] rounded-xl py-3 font-semibold text-[#3D3D3D] hover:bg-[#E8E4DD] transition text-left px-4">
                  📥 Unduh Laporan
                </button>
                <button className="w-full bg-[#F0EDE6] rounded-xl py-3 font-semibold text-[#3D3D3D] hover:bg-[#E8E4DD] transition text-left px-4">
                  📊 Analisis Nilai
                </button>
              </div>
            </div>

            {/* Kalender */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
              <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">📅 September 2026</h3>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((hari, i) => (
                  <div key={i} className="font-semibold text-[#7A7A7A] py-2 text-xs">{hari}</div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                  <div 
                    key={date} 
                    className={`py-2 rounded-lg ${
                      date === 2 ? 'bg-[#5B8C5A] text-white font-bold' : 'hover:bg-[#F0EDE6] cursor-pointer text-[#3D3D3D]'
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}