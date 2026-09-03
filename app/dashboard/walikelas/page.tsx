'use client'
import { useState } from 'react'

export default function DashboardWaliKelas() {
  const [kelasDipilih, setKelasDipilih] = useState('4B')

  // Data wali kelas
  const waliKelas = {
    nama: 'Bu Ani Susanti',
    nip: '198803152011012001',
    kelas: ['4A', '4B', '5A'],
  }

  // Data siswa per kelas
  const dataSiswa = {
    '4B': [
      { nama: 'Andi Wijaya', nis: '2024001', nilai: 85, kehadiran: 95, perilaku: 'Baik' },
      { nama: 'Budi Santoso', nis: '2024002', nilai: 82, kehadiran: 90, perilaku: 'Baik' },
      { nama: 'Citra Lestari', nis: '2024003', nilai: 88, kehadiran: 100, perilaku: 'Sangat Baik' },
      { nama: 'Dewi Kusuma', nis: '2024004', nilai: 90, kehadiran: 98, perilaku: 'Sangat Baik' },
      { nama: 'Eko Prasetyo', nis: '2024005', nilai: 78, kehadiran: 85, perilaku: 'Cukup' },
    ]
  }

  // Nilai per mata pelajaran
  const nilaiPerMapel = {
    '4B': [
      { mapel: 'Matematika', rataRata: 82, guru: 'Pak Budi' },
      { mapel: 'Bahasa Indonesia', rataRata: 85, guru: 'Bu Siti' },
      { mapel: 'IPAS', rataRata: 88, guru: 'Bu Sari' },
      { mapel: 'Bahasa Inggris', rataRata: 80, guru: 'Ms. Jane' },
      { mapel: 'Agama Katolik', rataRata: 92, guru: 'Romo Agus' },
      { mapel: 'PJOK', rataRata: 86, guru: 'Pak Toni' },
    ]
  }

  // Statistik kelas
  const stats = {
    totalSiswa: 30,
    rataRataKelas: 85,
    kehadiranRata: 94,
    siswaBerprestasi: 8,
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#3D3D3D]">Dashboard Wali Kelas</h1>
              <p className="text-sm text-[#7A7A7A]">Monitor perkembangan semua mata pelajaran</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={kelasDipilih}
                onChange={(e) => setKelasDipilih(e.target.value)}
                className="px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] bg-white text-[#3D3D3D] font-semibold"
              >
                {waliKelas.kelas.map((k) => (
                  <option key={k} value={k}>Kelas {k}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4B896] to-[#C4A886] rounded-full flex items-center justify-center text-white font-bold">
                  {waliKelas.nama.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-[#3D3D3D]">{waliKelas.nama}</p>
                  <p className="text-xs text-[#7A7A7A]">Wali Kelas {kelasDipilih}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Kelas */}
        <div className="bg-gradient-to-r from-[#6B9BB8] to-[#5A8AA7] rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Kelas {kelasDipilih} 📚</h2>
              <p className="opacity-90">Tahun Ajaran 2026/2027 • Semester Ganjil</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90">Wali Kelas</p>
              <p className="text-xl font-bold">{waliKelas.nama}</p>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#5B8C5A]">
            <p className="text-sm text-[#7A7A7A] mb-1">Total Siswa</p>
            <p className="text-3xl font-bold text-[#3D3D3D]">{stats.totalSiswa}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#6B9BB8]">
            <p className="text-sm text-[#7A7A7A] mb-1">Rata-rata Kelas</p>
            <p className="text-3xl font-bold text-[#3D3D3D]">{stats.rataRataKelas}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#D4B896]">
            <p className="text-sm text-[#7A7A7A] mb-1">Kehadiran Rata-rata</p>
            <p className="text-3xl font-bold text-[#3D3D3D]">{stats.kehadiranRata}%</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#C97B7B]">
            <p className="text-sm text-[#7A7A7A] mb-1">Siswa Berprestasi</p>
            <p className="text-3xl font-bold text-[#3D3D3D]">{stats.siswaBerprestasi}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nilai per Mata Pelajaran */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">📊 Nilai Rata-rata per Mata Pelajaran</h3>
            <div className="space-y-3">
              {nilaiPerMapel[kelasDipilih as keyof typeof nilaiPerMapel]?.map((item, index) => (
                <div key={index} className="p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold text-[#3D3D3D]">{item.mapel}</p>
                      <p className="text-sm text-[#7A7A7A]">Guru: {item.guru}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#5B8C5A]">{item.rataRata}</p>
                      <div className="w-24 bg-[#E8E4DD] rounded-full h-2 mt-1">
                        <div 
                          className="bg-[#5B8C5A] h-2 rounded-full"
                          style={{ width: `${item.rataRata}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daftar Siswa */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E8E4DD]">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">👥 Daftar Siswa Kelas {kelasDipilih}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F0EDE6]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-[#3D3D3D]">Nama</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-[#3D3D3D]">Nilai</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-[#3D3D3D]">Hadir</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-[#3D3D3D]">Perilaku</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DD]">
                  {dataSiswa[kelasDipilih as keyof typeof dataSiswa]?.map((siswa, index) => (
                    <tr key={index} className="hover:bg-[#FAFAF8]">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#3D3D3D]">{siswa.nama}</p>
                        <p className="text-xs text-[#7A7A7A]">{siswa.nis}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          siswa.nilai >= 85 ? 'bg-[#B8D4B8] text-[#3D5A3D]' :
                          siswa.nilai >= 75 ? 'bg-[#F5E6C8] text-[#7A5A2A]' :
                          'bg-[#E8C4C4] text-[#5A3D3D]'
                        }`}>
                          {siswa.nilai}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-[#3D3D3D]">{siswa.kehadiran}%</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          siswa.perilaku === 'Sangat Baik' ? 'bg-[#B8D4B8] text-[#3D5A3D]' :
                          siswa.perilaku === 'Baik' ? 'bg-[#B8D4E3] text-[#3D5A7A]' :
                          'bg-[#F5E6C8] text-[#7A5A2A]'
                        }`}>
                          {siswa.perilaku}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <button className="px-6 py-3 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition">
            📄 Cetak Rapor
          </button>
          <button className="px-6 py-3 bg-[#6B9BB8] text-white rounded-xl font-semibold hover:bg-[#5A8AA7] transition">
            📊 Unduh Laporan
          </button>
          <button className="px-6 py-3 bg-[#D4B896] text-white rounded-xl font-semibold hover:bg-[#C4A886] transition">
            💬 Kirim Pesan ke Orang Tua
          </button>
        </div>
      </main>
    </div>
  )
}