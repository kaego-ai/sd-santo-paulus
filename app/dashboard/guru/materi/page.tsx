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
    'IPAS': [],
    'Matematika': []
  })
  const [dragging, setDragging] = useState<Record<string, boolean>>({
    'IPAS': false,
    'Matematika': false
  })
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({
    'IPAS': 0,
    'Matematika': 0
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
    kelasAktif: 18, // 6 kelas x 3 paralel
  }

  const mapelList = ['IPAS', 'Matematika']
  const kelasOptions = [
    '1A', '1B', '1C',
    '2A', '2B', '2C',
    '3A', '3B', '3C',
    '4A', '4B', '4C',
    '5A', '5B', '5C',
    '6A', '6B', '6C',
  ]

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

  const selectAllKelas = (mapel: string) => {
    setSelectedKelas(prev => ({ ...prev, [mapel]: [...kelasOptions] }))
  }

  const clearAllKelas = (mapel: string) => {
    setSelectedKelas(prev => ({ ...prev, [mapel]: [] }))
  }

  const getBabByMapel = (mapel: string) => babList.filter(b => b.mapel === mapel)

  const handleDragOver = (e: React.DragEvent, mapel: string) => {
    e.preventDefault()
    setDragging(prev => ({ ...prev, [mapel]: true }))
  }

  const handleDragLeave = (e: React.DragEvent, mapel: string) => {
    e.preventDefault()
    setDragging(prev => ({ ...prev, [mapel]: false }))
  }

  const handleDrop = (e: React.DragEvent, mapel: string) => {
    e.preventDefault()
    setDragging(prev => ({ ...prev, [mapel]: false }))
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0], mapel)
    }
  }

  const handleFileUpload = (file: File, mapel: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(prev => ({ ...prev, [mapel]: progress }))
      if (progress >= 100) {
        clearInterval(interval)
        alert(`✅ File "${file.name}" berhasil diupload untuk ${mapel}!`)
        setUploadProgress(prev => ({ ...prev, [mapel]: 0 }))
      }
    }, 100)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, mapel: string) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0], mapel)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9F4] to-[#F5F5DC]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E4DD] p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#3D3D3D]">Selamat datang, Bu Sari! 👋</h1>
            <p className="text-sm text-[#7A7A7A] mt-1">Guru IPAS & Matematika</p>
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
            <span className="text-2xl">📝</span>
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
          const btnColor = isIPAS ? 'bg-[#5B8C5A] hover:bg-[#4A7349]' : 'bg-[#6B9BB8] hover:bg-[#5A8AA8]'
          const borderColor = dragging[mapel] ? 'border-[#5B8C5A] border-2 bg-[#F0F9F4]' : 'border-[#E8E4DD] border-2 border-dashed'
          const selectedKelasMapel = selectedKelas[mapel] || []

          return (
            <div key={mapel} className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
              {/* Header Mapel */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{isIPAS ? '🔬' : '🧮'}</span>
                <h2 className={`text-2xl font-bold ${isIPAS ? 'text-[#3D5A3D]' : 'text-[#3D5A7A]'}`}>{mapel}</h2>
              </div>

              {/* Upload Area dengan Drag & Drop */}
              <div
                onDragOver={(e) => handleDragOver(e, mapel)}
                onDragLeave={(e) => handleDragLeave(e, mapel)}
                onDrop={(e) => handleDrop(e, mapel)}
                className={`${borderColor} rounded-xl p-6 mb-4 text-center transition cursor-pointer bg-[#FAFAF8]`}
              >
                <div className="text-5xl mb-3">☁️</div>
                <p className="text-sm font-semibold text-[#3D3D3D] mb-1">Seret & lepas file atau klik</p>
                <p className="text-xs text-[#7A7A7A] mb-3">PDF, Video, PPT (Max 50 MB)</p>
                <input
                  type="file"
                  accept=".pdf,.mp4,.avi,.mov,.ppt,.pptx"
                  onChange={(e) => handleFileInput(e, mapel)}
                  className="hidden"
                  id={`file-${mapel}`}
                />
                <label
                  htmlFor={`file-${mapel}`}
                  className="px-4 py-2 bg-white border border-[#E8E4DD] rounded-lg text-sm font-semibold text-[#3D3D3D] hover:bg-[#F0EDE6] cursor-pointer inline-block"
                >
                  Pilih File
                </label>
                
                {uploadProgress[mapel] > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#5B8C5A] h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress[mapel]}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-[#7A7A7A] mt-1">{uploadProgress[mapel]}% uploaded</p>
                  </div>
                )}
              </div>

              {/* Pilih Kelas dengan Checkbox Pills */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#3D3D3D]">Publikasi ke Kelas:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectAllKelas(mapel)}
                      className="text-xs text-[#5B8C5A] hover:underline font-semibold"
                    >
                      Pilih Semua
                    </button>
                    <button
                      onClick={() => clearAllKelas(mapel)}
                      className="text-xs text-[#C97B7B] hover:underline font-semibold"
                    >
                      Hapus Semua
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-[#F7F5F0] rounded-xl">
                  {kelasOptions.map(kelas => {
                    const isSelected = selectedKelasMapel.includes(kelas)
                    return (
                      <button
                        key={kelas}
                        onClick={() => toggleKelas(mapel, kelas)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                          isSelected
                            ? isIPAS 
                              ? 'bg-[#5B8C5A] text-white' 
                              : 'bg-[#6B9BB8] text-white'
                            : 'bg-white text-[#7A7A7A] hover:bg-[#E8E4DD] border border-[#E8E4DD]'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{kelas}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-[#7A7A7A] mt-2">
                  Terpilih: {selectedKelasMapel.length > 0 
                    ? selectedKelasMapel.map(k => kelas).join(', ') 
                    : 'Belum ada kelas dipilih'}
                </p>
              </div>

              {/* Tombol Kelola Bab */}
              <button
                onClick={() => window.location.href = `/dashboard/guru/materi/${mapel.toLowerCase()}`}
                className={`w-full ${btnColor} text-white rounded-xl py-3 font-semibold transition mb-4 flex items-center justify-center gap-2`}
              >
                Kelola Bab {mapel}
                <span>→</span>
              </button>

              {/* Daftar Bab */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#7A7A7A] mb-2">Materi & Bab yang Sudah Diupload</h3>
                {babMapel.length === 0 ? (
                  <p className="text-sm text-[#7A7A7A] text-center py-4">Belum ada bab</p>
                ) : (
                  babMapel.map(bab => (
                    <div key={bab.id} className="flex items-center justify-between p-3 bg-[#F7F5F0] rounded-xl hover:bg-[#F0EDE6] transition cursor-pointer"
                         onClick={() => window.location.href = `/materi/${bab.id}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          bab.status === 'published' ? 'bg-[#5B8C5A]' : 'bg-[#D4B896]'
                        }`}>
                          {bab.id}
                        </div>
                        <div>
                          <p className="font-semibold text-[#3D3D3D] text-sm">{bab.judul}</p>
                          <p className="text-xs text-[#7A7A7A]">Update: {bab.updated}</p>
                        </div>
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

      {/* Panel Kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#F5E6E6] to-[#E8D4D4] rounded-2xl p-6">
          <h3 className="text-xl font-bold text-[#7A3D3D] mb-4">📝 Buat Soal Baru</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Pilihan Ganda', 'Uraian/Essay', 'Drag & Drop', 'Menjodohkan'].map((jenis, i) => (
              <button key={i} className="bg-white/80 backdrop-blur-sm rounded-xl py-3 font-semibold text-[#7A3D3D] hover:bg-white transition shadow-sm">
                {jenis}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">⚡ Tindakan Cepat</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl">🔍</button>
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl">📊</button>
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl">💬</button>
            <button className="p-3 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-2xl">⚙️</button>
          </div>
          <button className="w-full bg-gradient-to-r from-[#6B5B95] to-[#8B7BB5] text-white rounded-xl py-3 font-semibold hover:opacity-90 transition shadow-md">
            ✨ Generate dengan AI
          </button>
        </div>
      </div>
    </div>
  )
}