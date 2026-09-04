'use client'
import { useState, useEffect, use } from 'react'

interface Bab {
  id: number
  judul: string
  mapel: string
  status: 'published' | 'draft'
  updated: string
  kelas?: string[]
}

export default function KelolaBabMapel({ params }: { params: Promise<{ mapel: string }> }) {
  const unwrappedParams = use(params)
  const mapel = unwrappedParams.mapel
  const [babList, setBabList] = useState<Bab[]>([])
  const [filterKelas, setFilterKelas] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('terbaru')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('sd_santo_paulus_bab_data')
    if (saved) {
      try {
        const allBab = JSON.parse(saved)
        setBabList(allBab.filter((b: Bab) => b.mapel.toLowerCase() === mapel))
      } catch (e) {
        console.error(e)
      }
    }
  }, [mapel])

  const filteredBab = babList.filter(bab => {
    const matchSearch = bab.judul.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === 'all' || bab.status === filterStatus
    return matchSearch && matchStatus
  })

  const togglePublish = (id: number) => {
    const saved = localStorage.getItem('sd_santo_paulus_bab_data')
    if (saved) {
      const allBab = JSON.parse(saved)
      const updated = allBab.map((b: Bab) => 
        b.id === id ? { ...b, status: b.status === 'published' ? 'draft' : 'published' } : b
      )
      localStorage.setItem('sd_santo_paulus_bab_data', JSON.stringify(updated))
      setBabList(updated.filter((b: Bab) => b.mapel.toLowerCase() === mapel))
    }
  }

  const hapusBab = (id: number) => {
    if (confirm('Yakin ingin menghapus bab ini?')) {
      const saved = localStorage.getItem('sd_santo_paulus_bab_data')
      if (saved) {
        const allBab = JSON.parse(saved)
        const updated = allBab.filter((b: Bab) => b.id !== id)
        localStorage.setItem('sd_santo_paulus_bab_data', JSON.stringify(updated))
        setBabList(updated.filter((b: Bab) => b.mapel.toLowerCase() === mapel))
      }
    }
  }

  const publishedCount = filteredBab.filter(b => b.status === 'published').length
  const draftCount = filteredBab.filter(b => b.status === 'draft').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9F4] to-[#F5F5DC]">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E4DD] p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => window.location.href = '/dashboard/guru'} className="text-[#5B8C5A] hover:underline">
              ← Kembali ke Dashboard
            </button>
            <span className="text-[#7A7A7A]">/</span>
            <span className="text-[#7A7A7A]">Materi</span>
            <span className="text-[#7A7A7A]">/</span>
            <span className="font-semibold text-[#3D3D3D]">{mapel.toUpperCase()}</span>
          </div>
          <button className="px-4 py-2 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition">
            + Tambah Bab Baru
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6 mb-6">
        <h1 className="text-3xl font-bold text-[#3D3D3D] mb-2">📚 Kelola Bab {mapel.toUpperCase()}</h1>
        <p className="text-sm text-[#7A7A7A]">Tahun Ajaran 2026/2027 | Semester Ganjil</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Cari bab..."
              className="w-full px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A]"
          >
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A]"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
            <option value="judul">Judul A-Z</option>
          </select>
        </div>
      </div>

      {/* Daftar Bab */}
      <div className="space-y-4 mb-6">
        {filteredBab.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-lg text-[#7A7A7A]">Belum ada bab untuk {mapel.toUpperCase()}</p>
          </div>
        ) : (
          filteredBab.map((bab, index) => (
            <div
              key={bab.id}
              className={`bg-white rounded-2xl shadow-sm border-2 p-6 transition ${
                bab.status === 'published' ? 'border-[#B8D4B8]' : 'border-[#F5E6C8]'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    bab.status === 'published' ? 'bg-[#5B8C5A]' : 'bg-[#D4B896]'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#3D3D3D]">{bab.judul}</h3>
                    <p className="text-sm text-[#7A7A7A]">
                      Update: {bab.updated} • {bab.kelas?.length || 0} kelas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    bab.status === 'published'
                      ? 'bg-[#B8D4B8] text-[#3D5A3D]'
                      : 'bg-[#F5E6C8] text-[#7A5A2A]'
                  }`}>
                    {bab.status === 'published' ? '⚙️ Published' : '️ Draft'}
                  </span>

                  <button
                    onClick={() => window.location.href = `/materi/${bab.id}`}
                    className="p-2 text-[#6B9BB8] hover:bg-[#B8D4E3] rounded-lg transition"
                    title="Edit"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => togglePublish(bab.id)}
                    className="p-2 text-[#5B8C5A] hover:bg-[#B8D4B8] rounded-lg transition"
                    title={bab.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    {bab.status === 'published' ? '' : '🔒'}
                  </button>

                  <button
                    onClick={() => window.location.href = `/dashboard/siswa/materi/${bab.id}`}
                    className="p-2 text-[#6B5B95] hover:bg-[#E8D4E8] rounded-lg transition"
                    title="Preview sebagai Siswa"
                  >
                    👁️
                  </button>

                  <button
                    onClick={() => hapusBab(bab.id)}
                    className="p-2 text-[#C97B7B] hover:bg-[#E8C4C4] rounded-lg transition"
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-4 text-center">
        <p className="text-sm text-[#7A7A7A] mb-3">
          Total: {filteredBab.length} Bab ({publishedCount} Published, {draftCount} Draft)
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-[#6B5B95] to-[#8B7BB5] text-white rounded-xl font-semibold hover:opacity-90 transition">
           Generate Bab Baru dengan AI
        </button>
      </div>
    </div>
  )
}