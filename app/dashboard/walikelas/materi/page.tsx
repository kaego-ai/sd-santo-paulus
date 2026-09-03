'use client'
import { useState } from 'react'
import { useBabManager } from '@/app/components/useBabManager'

export default function ManajemenMateriWaliKelas() {
  const {
    babList,
    tambahBab,
    editBab,
    hapusBab,
    togglePublish,
    pindahkanBab,
    resetBab,
  } = useBabManager()

  const [showForm, setShowForm] = useState(false)
  const [judulBaru, setJudulBaru] = useState('')
  const [mapelBaru, setMapelBaru] = useState('IPAS')
  const [editId, setEditId] = useState<number | null>(null)
  const [editJudul, setEditJudul] = useState('')
  const [search, setSearch] = useState('')
  const [filterMapel, setFilterMapel] = useState('semua')

  const daftarMapel = Array.from(new Set(babList.map(b => b.mapel)))

  const filteredBab = babList.filter(bab => {
    const matchSearch = bab.judul.toLowerCase().includes(search.toLowerCase())
    const matchMapel = filterMapel === 'semua' || bab.mapel === filterMapel
    return matchSearch && matchMapel
  })

  const handleTambah = () => {
    if (!judulBaru.trim()) {
      alert('Judul bab tidak boleh kosong!')
      return
    }
    tambahBab(judulBaru, mapelBaru)
    setJudulBaru('')
    setShowForm(false)
  }

  const handleEdit = (id: number) => {
    if (!editJudul.trim()) {
      alert('Judul tidak boleh kosong!')
      return
    }
    editBab(id, editJudul)
    setEditId(null)
    setEditJudul('')
  }

  const handleHapus = (id: number, judul: string) => {
    if (confirm(`Yakin ingin menghapus "${judul}"?`)) {
      hapusBab(id)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#3D3D3D]"> Manajemen Materi Semua Mapel</h1>
              <p className="text-sm text-[#7A7A7A]">
                Wali Kelas dapat melihat & merevisi materi dari semua guru
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/dashboard/walikelas'}
              className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD] transition"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#6B9BB8] to-[#5A8AA7] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2"> Fitur Wali Kelas</h2>
          <ul className="space-y-1 opacity-90 text-sm">
            <li>✅ Lihat semua materi dari semua mata pelajaran</li>
            <li>✅ Revisi/edit judul bab dari mapel manapun</li>
            <li>✅ Publish/unpublish materi</li>
            <li>✅ Tambah bab baru untuk mapel tertentu</li>
            <li>✅ Filter berdasarkan mata pelajaran</li>
          </ul>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[#6B9BB8] text-white rounded-xl font-semibold hover:bg-[#5A8AA7] transition flex items-center gap-2"
            >
              <span>+</span>
              <span>Tambah Bab</span>
            </button>

            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Cari bab..."
                className="w-full px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] bg-[#FAFAF8]"
              />
            </div>

            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] bg-white text-[#3D3D3D]"
            >
              <option value="semua">Semua Mapel</option>
              {daftarMapel.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>

            <button
              onClick={resetBab}
              className="px-4 py-2 bg-[#F0EDE6] text-[#7A7A7A] rounded-xl font-semibold hover:bg-[#E8E4DD] transition text-sm"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Form Tambah */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#6B9BB8] p-6 mb-6">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">➕ Tambah Bab Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                value={mapelBaru}
                onChange={(e) => setMapelBaru(e.target.value)}
                className="px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D]"
              >
                <option value="IPAS">IPAS</option>
                <option value="Matematika">Matematika</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Agama Katolik">Agama Katolik</option>
                <option value="PJOK">PJOK</option>
              </select>
              <input
                type="text"
                value={judulBaru}
                onChange={(e) => setJudulBaru(e.target.value)}
                placeholder="Judul bab..."
                className="md:col-span-1 px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D]"
                onKeyPress={(e) => e.key === 'Enter' && handleTambah()}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleTambah}
                  className="flex-1 px-6 py-3 bg-[#6B9BB8] text-white rounded-xl font-semibold hover:bg-[#5A8AA7] transition"
                >
                  ✓ Simpan
                </button>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setJudulBaru('')
                  }}
                  className="flex-1 px-6 py-3 bg-[#E8E4DD] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#D4D0C8] transition"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Daftar Bab per Mapel */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h3 className="text-lg font-bold text-[#3D3D3D]">
              📋 Daftar Bab per Mata Pelajaran ({filteredBab.length} bab)
            </h3>
            <div className="flex gap-2 text-xs flex-wrap">
              <span className="px-3 py-1 bg-[#B8D4B8] text-[#3D5A3D] rounded-full font-semibold">
                ✓ Published: {babList.filter(b => b.status === 'published').length}
              </span>
              <span className="px-3 py-1 bg-[#F5E6C8] text-[#7A5A2A] rounded-full font-semibold">
                 Draft: {babList.filter(b => b.status === 'draft').length}
              </span>
            </div>
          </div>

          {filteredBab.length === 0 ? (
            <div className="text-center py-12 text-[#7A7A7A]">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-lg">
                {search || filterMapel !== 'semua' 
                  ? 'Tidak ada bab yang cocok' 
                  : 'Belum ada bab'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {daftarMapel
                .filter(mapel => filterMapel === 'semua' || mapel === filterMapel)
                .map((mapel, mapelIndex) => {
                  const babPerMapel = filteredBab.filter(b => b.mapel === mapel)
                  if (babPerMapel.length === 0) return null
                  
                  return (
                    <div key={mapelIndex} className="border border-[#E8E4DD] rounded-xl overflow-hidden">
                      {/* Header Mapel */}
                      <div className="bg-gradient-to-r from-[#6B9BB8] to-[#5A8AA7] text-white px-4 py-3 flex items-center justify-between">
                        <h4 className="font-bold text-lg">📚 {mapel}</h4>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                          {babPerMapel.length} bab • {babPerMapel.filter(b => b.status === 'published').length} published
                        </span>
                      </div>

                      {/* List Bab */}
                      <div className="divide-y divide-[#E8E4DD]">
                        {babPerMapel.map((bab, index) => (
                          <div
                            key={bab.id}
                            className="flex items-center gap-4 p-4 hover:bg-[#FAFAF8] transition"
                          >
                            <div className="w-10 h-10 bg-[#B8D4E3] text-[#3D5A7A] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              {bab.id}
                            </div>

                            <div className="flex-1 min-w-0">
                              {editId === bab.id ? (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={editJudul}
                                    onChange={(e) => setEditJudul(e.target.value)}
                                    className="flex-1 px-3 py-1 border border-[#6B9BB8] rounded-lg focus:outline-none text-[#3D3D3D]"
                                    autoFocus
                                    onKeyPress={(e) => e.key === 'Enter' && handleEdit(bab.id)}
                                  />
                                  <button
                                    onClick={() => handleEdit(bab.id)}
                                    className="px-3 py-1 bg-[#6B9BB8] text-white rounded-lg text-sm font-semibold"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditId(null)
                                      setEditJudul('')
                                    }}
                                    className="px-3 py-1 bg-[#E8E4DD] text-[#3D3D3D] rounded-lg text-sm font-semibold"
                                  >
                                    ✗
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <h5 className="font-bold text-[#3D3D3D]">{bab.judul}</h5>
                                  <p className="text-xs text-[#7A7A7A]">Update: {bab.updated}</p>
                                </>
                              )}
                            </div>

                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              bab.status === 'published'
                                ? 'bg-[#B8D4B8] text-[#3D5A3D]'
                                : 'bg-[#F5E6C8] text-[#7A5A2A]'
                            }`}>
                              {bab.status === 'published' ? '✓ Published' : ' Draft'}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditId(bab.id)
                                  setEditJudul(bab.judul)
                                }}
                                className="p-2 text-[#6B9BB8] hover:bg-[#B8D4E3] rounded-lg transition"
                                title="Edit"
                              >
                                ✏️
                              </button>

                              <button
                                onClick={() => togglePublish(bab.id)}
                                className={`p-2 rounded-lg transition ${
                                  bab.status === 'published'
                                    ? 'text-[#C97B7B] hover:bg-[#E8C4C4]'
                                    : 'text-[#5B8C5A] hover:bg-[#B8D4B8]'
                                }`}
                                title={bab.status === 'published' ? 'Unpublish' : 'Publish'}
                              >
                                {bab.status === 'published' ? '🔓' : '🔒'}
                              </button>

                              <button
                                onClick={() => window.location.href = `/materi/${bab.id}`}
                                className="p-2 text-[#D4B896] hover:bg-[#F5E6C8] rounded-lg transition"
                                title="Lihat"
                              >
                                👁️
                              </button>

                              <button
                                onClick={() => handleHapus(bab.id, bab.judul)}
                                className="p-2 text-[#C97B7B] hover:bg-[#E8C4C4] rounded-lg transition"
                                title="Hapus"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>

        <div className="mt-6 bg-[#B8D4E3] border-2 border-[#6B9BB8] rounded-2xl p-4 text-[#3D5A7A]">
          <p className="text-sm">
            💾 <strong>Data tersimpan otomatis</strong> di browser. 
            Wali Kelas dapat merevisi materi dari semua mata pelajaran.
          </p>
        </div>
      </main>
    </div>
  )
}