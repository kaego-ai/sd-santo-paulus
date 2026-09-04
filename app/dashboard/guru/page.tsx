'use client'
import { useState, useEffect } from 'react'

interface Bab {
  id: number
  judul: string
  mapel: string
  status: 'published' | 'draft'
  updated: string
  kelas?: string[]
}

export default function DashboardGuru() {
  const [babList, setBabList] = useState<Bab[]>([])
  const [selectedKelas, setSelectedKelas] = useState<Record<string, string[]>>({
    'IPAS': ['4A', '4B'],
    'Matematika': ['4A', '4B']
  })

  useEffect(() => {
    const saved = localStorage.getItem('sd_santo_paulus_bab_data')
    if (saved) {
      try {
        setBabList(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const stats = {
    totalSiswa: 150,
    materiDiupload: babList.length,
    soalDibuat: 156,
    kelasAktif: 5,
  }

  const mapelList = ['IPAS', 'Matematika']
  const kelasOptions = ['4A', '4B', '5A', '5B', '5C']

  const toggleKelas = (mapel: string, kelas: string) => {
    setSelectedKelas(prev => {
      const current = prev[mapel] || []
      return {
        ...prev,
        [mapel]: current.includes(kelas)
          ? current.filter(k => k !== kelas)
          : [...current, kelas]
      }
    })
  }

  const getBabByMapel = (mapel: string) => babList.filter(b => b.mapel === mapel)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9F4] to-[#F5F5DC]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E4DD] p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#3D3D3D]">Selamat datang, Bu Sari! 👋</h1>
            <p className="text-sm text-[#7A7A7A] mt-1">Guru IPAS & Matematika • Kelas 4B</p>
          </div>
          <button className="relative p-3 text-[#7A7A7A] hover:bg-[#F0EDE6] rounded-xl transition">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#B8D4B8] to-[#A8C4A8] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👥</span>
            <span className="text-sm font-semibold text-[#3D5A3D]">Total Siswa</span>
          </div>
          <p className="text-3xl font-bold text-[#3D5A3D]">{stats.totalSiswa}</p>
        </div>

        <div className="bg-gradient-to-br from-[#F5E6C8] to-[#E8D4B0] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl"></span>
            <span className="text-sm font-semibold text-[#7A5A2A]">Materi Diupload</span>
          </div>
          <p className="text-3xl font-bold text-[#7A5A2A]">{stats.materiDiupload}</p>
        </div>

        <div className="bg-gradient-to-br from-[#B8D4E3] to-[#A8C4D3] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl"></span>
            <span className="text-sm font-semibold text-[#3D5A7A]">Soal Dibuat</span>
          </div>
          <p className="text-3xl font-bold text-[#3D5A7A]">{stats.soalDibuat}</p>
        </div>

        <div className="bg-gradient-to-br from-[#E8C4C4] to-[#D4B0B0] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏫</span>
            <span className="text-sm font-semibold text-[#7A3D3D]">Kelas Aktif</span>
          </div>
          <p className="text-3xl font-bold text-[#7A3D3D]">{stats.kelasAktif}</p>
        </div>
      </div>

      {/* Main Content: 2 Kolom Mapel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {mapelList.map(mapel => {
          const babMapel = getBabByMapel(mapel)
          const isIPAS = mapel === 'IPAS'
          const bgColor = isIPAS ? 'from-[#B8D4B8] to-[#A8C4A8]' : 'from-[#B8D4E3] to-[#A8C4D3]'
          const textColor = isIPAS ? 'text-[#3D5A3D]' : 'text-[#3D5A7A]'
          const btnColor = isIPAS ? 'bg-[#5B8C5A] hover:bg-[#4A7349]' : 'bg-[#6B9BB8] hover:bg-[#5A8AA8]'

          return (
            <div key={mapel} className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
              {/* Header Mapel */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{isIPAS ? '' : '🧮'}</span>
                <h2 className={`text-2xl font-bold ${textColor}`}>{mapel}</h2>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-[#E8E4DD] rounded-xl p-6 mb-4 text-center hover:border-[#5B8C5A] transition cursor-pointer">
                <div className="text-4xl mb-2">☁️</div>
                <p className="text-sm text-[#7A7A7A]">Seret & lepas file atau klik</p>
                <p className="text-xs text-[#7A7A7A] mt-1">PDF, Video, PPT (Max 50 MB)</p>
              </div>

              {/* Dropdown Kelas */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-[#3D3D3D] mb-2 block">Pilih Kelas:</label>
                <select
                  multiple
                  value={selectedKelas[mapel] || []}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setSelectedKelas(prev => ({ ...prev, [mapel]: values }))
                  }}
                  className="w-full px-3 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] bg-white"
                >
                  {kelasOptions.map(kelas => (
                    <option key={kelas} value={kelas}>Kelas {kelas}</option>
                  ))}
                </select>
                <p className="text-xs text-[#7A7A7A] mt-1">
                  Terpilih: {(selectedKelas[mapel] || []).map(k => `Kelas ${k}`).join(', ') || 'Belum ada'}
                </p>
              </div>

              {/* Tombol Kelola Bab */}
              <button
                onClick={() => window.location.href = `/dashboard/guru/materi/${mapel.toLowerCase()}`}
                className={`w-full ${btnColor} text-white rounded-xl py-3 font-semibold transition mb-4`}
              >
                Kelola Bab {mapel} →
              </button>

              {/* Daftar Bab */}
              <div className="space-y-2">
                {babMapel.length === 0 ? (
                  <p className="text-sm text-[#7A7A7A] text-center py-4">Belum ada bab</p>
                ) : (
                  babMapel.map(bab => (
                    <div key={bab.id} className="flex items-center justify-between p-3 bg-[#F7F5F0] rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#3D3D3D]">{bab.judul}</span>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        bab.status === 'published'
                          ? 'bg-[#B8D4B8] text-[#3D5A3D]'
                          : 'bg-[#F5E6C8] text-[#7A5A2A]'
                      }`}>
                        {bab.status === 'published' ? '✓ Published' : '📝 Draft'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Panel Kanan: Buat Soal & Tindakan Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buat Soal Baru */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#F5E6E6] to-[#E8D4D4] rounded-2xl p-6">
          <h3 className="text-xl font-bold text-[#7A3D3D] mb-4">📝 Buat Soal Baru</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Pilihan Ganda', 'Uraian/Essay', 'Drag & Drop', 'Menjodohkan'].map((jenis, i) => (
              <button key={i} className="bg-white/80 backdrop-blur-sm rounded-xl py-3 font-semibold text-[#7A3D3D] hover:bg-white transition">
                {jenis}
              </button>
            ))}
          </div>
        </div>

        {/* Tindakan Cepat */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">⚡ Tindakan Cepat</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl"></button>
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl">📊</button>
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl"></button>
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl">⚙️</button>
          </div>
          <button className="w-full bg-gradient-to-r from-[#6B5B95] to-[#8B7BB5] text-white rounded-xl py-3 font-semibold hover:opacity-90 transition">
            ✨ Generate dengan AI
          </button>
        </div>
      </div>
    </div>
  )
}