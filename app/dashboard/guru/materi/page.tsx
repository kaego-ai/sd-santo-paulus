'use client'
import { useState } from 'react'
import { useBabManager } from '@/app/components/useBabManager'

export default function ManajemenMateri() {
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
  const [editId, setEditId] = useState<number | null>(null)
  const [editJudul, setEditJudul] = useState('')
  const [search, setSearch] = useState('')

  const filteredBab = babList.filter(bab => 
    bab.judul.toLowerCase().includes(search.toLowerCase())
  )

  const handleTambah = () => {
    if (!judulBaru.trim()) {
      alert('Judul bab tidak boleh kosong!')
      return
    }
    tambahBab(judulBaru, 'IPAS')
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
              <h1 className="text-2xl font-bold text-[#3D3D3D]"> Manajemen Materi & Bab</h1>
              <p className="text-sm text-[#7A7A7A]">
                Kelola bab materi Anda. Perubahan otomatis tersimpan.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/dashboard/guru'}
              className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD] transition"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-[#5B8C5A] to-[#4A7349] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">💡 Cara Menggunakan</h2>
          <ul className="space-y-1 opacity-90 text-sm">
            <li>✅ Tambah bab baru dengan klik tombol "Tambah Bab"</li>
            <li>✅ Edit judul bab dengan klik icon pensil</li>
            <li>✅ Publish bab agar bisa dilihat siswa di sidebar</li>
            <li>✅ Urutkan bab dengan tombol ↑ ↓</li>
            <li>✅ Data otomatis tersimpan di browser Anda</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition flex items-center gap-2"
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
                className="w-full px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] bg-[#FAFAF8]"
              />
            </div>

            <button
              onClick={resetBab}
              className="px-4 py-2 bg-[#F0EDE6] text-[#7A7A7A] rounded-xl font-semibold hover:bg-[#E8E4DD] transition text-sm"
            >
               Reset Default
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#5B8C5A] p-6 mb-6">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">➕ Tambah Bab Baru</h3>
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                value={judulBaru}
                onChange={(e) => setJudulBaru(e.target.value)}
                placeholder="Contoh: Bab 6: Sistem Pencernaan Manusia"
                className="flex-1 min-w-[200px] px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D]"
                onKeyPress={(e) => e.key === 'Enter' && handleTambah()}
                autoFocus
              />
              <button
                onClick={handleTambah}
                className="px-6 py-3 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition"
              >
                ✓ Simpan
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setJudulBaru('')
                }}
                className="px-6 py-3 bg-[#E8E4DD] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#D4D0C8] transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#3D3D3D]">
              📋 Daftar Bab ({filteredBab.length} bab)
            </h3>
            <div className="flex gap-2 text-xs">
              <span className="px-3 py-1 bg-[#B8D4B8] text-[#3D5A3D] rounded-full font-semibold">
                ✓ Published: {babList.filter(b => b.status === 'published').length}
              </span>
              <span className="px-3 py-1 bg-[#F5E6C8] text-[#7A5A2A] rounded-full font-semibold">
                📝 Draft: {babList.filter(b => b.status === 'draft').length}
              </span>
            </div>
          </div>

          {filteredBab.length === 0 ? (
            <div className="text-center py-12 text-[#7A7A7A]">
              <div className="text-5xl mb-4"></div>
              <p className="text-lg">
                {search ? 'Tidak ada bab yang cocok dengan pencarian' : 'Belum ada bab. Tambahkan bab pertama Anda!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBab.map((bab, index) => (
                <div
                  key={bab.id}
                  className="flex items-center gap-4 p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD] hover:border-[#5B8C5A] transition group"
                >
                  <div className="w-10 h-10 bg-[#5B8C5A] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {bab.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    {editId === bab.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editJudul}
                          onChange={(e) => setEditJudul(e.target.value)}
                          className="flex-1 px-3 py-1 border border-[#5B8C5A] rounded-lg focus:outline-none text-[#3D3D3D]"
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && handleEdit(bab.id)}
                        />
                        <button
                          onClick={() => handleEdit(bab.id)}
                          className="px-3 py-1 bg-[#5B8C5A] text-white rounded-lg text-sm font-semibold hover:bg-[#4A7349]"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null)
                            setEditJudul('')
                          }}
                          className="px-3 py-1 bg-[#E8E4DD] text-[#3D3D3D] rounded-lg text-sm font-semibold hover:bg-[#D4D0C8]"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-[#3D3D3D] truncate">{bab.judul}</h4>
                        <p className="text-xs text-[#7A7A7A]">Update: {bab.updated}</p>
                      </>
                    )}
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 ${
                    bab.status === 'published'
                      ? 'bg-[#B8D4B8] text-[#3D5A3D]'
                      : 'bg-[#F5E6C8] text-[#7A5A2A]'
                  }`}>
                    {bab.status === 'published' ? '✓ Published' : ' Draft'}
                  </span>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => pindahkanBab(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-[#7A7A7A] hover:text-[#5B8C5A] disabled:opacity-30 text-xs"
                        title="Pindah ke atas"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => pindahkanBab(index, 'down')}
                        disabled={index === babList.length - 1}
                        className="p-1 text-[#7A7A7A] hover:text-[#5B8C5A] disabled:opacity-30 text-xs"
                        title="Pindah ke bawah"
                      >
                        ↓
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setEditId(bab.id)
                        setEditJudul(bab.judul)
                      }}
                      className="p-2 text-[#6B9BB8] hover:bg-[#B8D4E3] rounded-lg transition"
                      title="Edit judul"
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
                      title="Lihat materi"
                    >
                      👁️
                    </button>

                    <button
                      onClick={() => handleHapus(bab.id, bab.judul)}
                      className="p-2 text-[#C97B7B] hover:bg-[#E8C4C4] rounded-lg transition"
                      title="Hapus bab"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-[#B8D4E3] border-2 border-[#6B9BB8] rounded-2xl p-4 text-[#3D5A7A]">
          <p className="text-sm">
            💾 <strong>Data tersimpan otomatis</strong> di browser Anda. 
            Untuk menyimpan secara permanen dan bisa diakses dari device lain, 
            nanti kita akan integrasikan dengan Supabase.
          </p>
        </div>
      </main>
    </div>
  )
}