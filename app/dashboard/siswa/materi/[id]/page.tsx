'use client'
import { useState, useEffect, use } from 'react'

interface MateriContent {
  pengantar: string
  tujuanPembelajaran: string[]
  materiUtama: string
  contohKasus: string
  rangkuman: string[]
  latihanSoal: {
    pertanyaan: string
    pilihan: string[]
    jawaban: number
  }[]
}

interface Bab {
  id: number
  judul: string
  mapel: string
  status: string
  updated: string
}

export default function HalamanMateriSiswa({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const [bab, setBab] = useState<Bab | null>(null)
  const [konten, setKonten] = useState<MateriContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const babId = parseInt(unwrappedParams.id)

  useEffect(() => {
    const saved = localStorage.getItem('sd_santo_paulus_bab_data')
    if (saved) {
      try {
        const list = JSON.parse(saved)
        const found = list.find((b: Bab) => b.id === babId)
        if (found) {
          setBab(found)
        }
      } catch (e) {
        console.error(e)
      }
    }
    setIsLoading(false)
  }, [babId])

  useEffect(() => {
    const saved = localStorage.getItem(`materi_konten_${babId}`)
    if (saved) {
      try {
        setKonten(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [babId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4"></div>
          <p className="text-[#7A7A7A]">Memuat materi...</p>
        </div>
      </div>
    )
  }

  if (!bab) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-[#3D3D3D]">Materi Tidak Ditemukan</h1>
          <button 
            onClick={() => window.location.href = '/dashboard/siswa'}
            className="mt-4 px-6 py-2 bg-[#5B8C5A] text-white rounded-xl"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#E8E4DD]">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-[#B8D4E3] text-[#3D5A7A] rounded-full font-semibold">
                  {bab.mapel || 'Umum'}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  bab.status === 'published' ? 'bg-[#B8D4B8] text-[#3D5A3D]' : 'bg-[#F5E6C8] text-[#7A5A2A]'
                }`}>
                  {bab.status === 'published' ? '✓ Published' : '📝 Draft'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#3D3D3D] mt-1">
                 Bab {bab.id}: {bab.judul}
              </h1>
              <p className="text-sm text-[#7A7A7A]">
                Update: {bab.updated}
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD] transition"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </header>

      {/* Konten Materi - READ ONLY */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {konten ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6 space-y-6">
            {/* Pengantar */}
            {konten.pengantar && (
              <div className="bg-gradient-to-r from-[#B8D4E3] to-[#A8C4D3] rounded-xl p-4">
                <h3 className="font-bold text-[#3D5A7A] mb-2">📖 Pengantar</h3>
                <p className="text-[#3D3D3D]">{konten.pengantar}</p>
              </div>
            )}

            {/* Tujuan Pembelajaran */}
            {konten.tujuanPembelajaran && (
              <div>
                <h3 className="font-bold text-[#3D3D3D] mb-3">🎯 Tujuan Pembelajaran</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {konten.tujuanPembelajaran.map((tujuan: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-[#F7F5F0] rounded-lg">
                      <span className="text-[#5B8C5A] font-bold">{i + 1}.</span>
                      <span className="text-[#3D3D3D]">{tujuan}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materi Utama */}
            {konten.materiUtama && (
              <div>
                <h3 className="font-bold text-[#3D3D3D] mb-3">📚 Materi Utama</h3>
                <div className="text-[#3D3D3D] leading-relaxed whitespace-pre-line">
                  {konten.materiUtama}
                </div>
              </div>
            )}

            {/* Contoh Kasus */}
            {konten.contohKasus && (
              <div className="bg-[#F5E6C8] rounded-xl p-4">
                <h3 className="font-bold text-[#7A5A2A] mb-2">💡 Contoh Kasus</h3>
                <p className="text-[#3D3D3D]">{konten.contohKasus}</p>
              </div>
            )}

            {/* Rangkuman */}
            {konten.rangkuman && (
              <div className="bg-[#B8D4B8] rounded-xl p-4">
                <h3 className="font-bold text-[#3D5A3D] mb-2">📝 Rangkuman</h3>
                <ul className="list-disc list-inside space-y-1">
                  {konten.rangkuman.map((poin: string, i: number) => (
                    <li key={i} className="text-[#3D3D3D]">{poin}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Latihan Soal */}
            {konten.latihanSoal && (
              <div>
                <h3 className="font-bold text-[#3D3D3D] mb-3">️ Latihan Soal</h3>
                <div className="space-y-4">
                  {konten.latihanSoal.map((soal: any, i: number) => (
                    <div key={i} className="p-4 bg-[#F7F5F0] rounded-xl border border-[#E8E4DD]">
                      <p className="font-semibold text-[#3D3D3D] mb-3">
                        {i + 1}. {soal.pertanyaan}
                      </p>
                      <div className="space-y-2 ml-4">
                        {soal.pilihan.map((pilihan: string, j: number) => (
                          <div key={j} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-white border border-[#E8E4DD] rounded-full flex items-center justify-center text-xs font-bold text-[#5B8C5A]">
                              {String.fromCharCode(65 + j)}
                            </span>
                            <span className="text-[#3D3D3D]">{pilihan.replace(/^[A-D]\.\s*/, '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-[#3D3D3D] mb-2">
              Konten Belum Tersedia
            </h2>
            <p className="text-[#7A7A7A]">
              Mohon hubungi guru Anda untuk membuatkan materi ini.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}