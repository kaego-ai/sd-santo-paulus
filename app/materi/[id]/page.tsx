'use client'
import { useState, useEffect, use } from 'react'
import { useBabManager } from '@/app/components/useBabManager'
import { useAIManager } from '@/app/components/useAIManager'

export default function HalamanMateri({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const { babList, isLoading } = useBabManager()
  const { isGenerating, error, generateMateri, generateImage } = useAIManager()
  
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [illustration, setIllustration] = useState<any>(null)
  const [savedContent, setSavedContent] = useState<any>(null)
  
  // State untuk custom prompt
  const [kesulitan, setKesulitan] = useState('Sedang')
  const [jumlahSoal, setJumlahSoal] = useState(3)
  const [fokusMateri, setFokus] = useState('Keduanya')
  const [instruksiKhusus, setInstruksiKhusus] = useState('')

  const babId = parseInt(unwrappedParams.id)
  const bab = babList.find(b => b.id === babId)

  // Load konten yang sudah disimpan
  useEffect(() => {
    const saved = localStorage.getItem(`materi_konten_${babId}`)
    if (saved) {
      try {
        setSavedContent(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [babId])

  const handleGenerateAI = async () => {
    if (!bab) return

    const customPrompt = `
      Tingkat kesulitan: ${kesulitan}
      Fokus: ${fokusMateri}
      Jumlah soal: ${jumlahSoal}
      ${instruksiKhusus ? `Instruksi tambahan: ${instruksiKhusus}` : ''}
    `

    const content = await generateMateri(
      bab.judul,
      bab.mapel || 'Umum',
      '4',
      `${bab.judul} - ${customPrompt}`
    )

    if (content) {
      setGeneratedContent(content)
      const img = await generateImage(bab.judul)
      setIllustration(img)
    }
  }

  const handleSaveContent = () => {
    if (generatedContent) {
      localStorage.setItem(`materi_konten_${babId}`, JSON.stringify(generatedContent))
      setSavedContent(generatedContent)
      alert('✅ Konten berhasil disimpan!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
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
          <h1 className="text-2xl font-bold text-[#3D3D3D]">Bab Tidak Ditemukan</h1>
          <p className="text-[#7A7A7A] mt-2">
            Bab dengan ID {unwrappedParams.id} tidak ada
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard/guru/materi'}
            className="mt-4 px-6 py-2 bg-[#5B8C5A] text-white rounded-xl"
          >
            ← Kembali ke Manajemen Materi
          </button>
        </div>
      </div>
    )
  }

  const konten = savedContent || generatedContent

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
                📚 Bab {bab.id}: {bab.judul}
              </h1>
              <p className="text-sm text-[#7A7A7A]">
                Update: {bab.updated}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
              >
                ✨ AI Generate
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD] transition"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Panel dengan Custom Prompt */}
      {showAIPanel && (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 animate-fadeInUp">
            <h3 className="text-lg font-bold text-purple-900 mb-4">
              🤖 Generate Konten dengan AI
            </h3>
            <p className="text-sm text-purple-700 mb-4">
              AI akan membuat konten lengkap untuk bab <strong>"{bab.judul}"</strong> termasuk ilustrasi dan soal latihan.
            </p>

            {/* Form Pengaturan */}
            <div className="bg-white rounded-xl p-4 mb-4 space-y-4">
              {/* Tingkat Kesulitan */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">
                  📊 Tingkat Kesulitan
                </label>
                <div className="flex gap-2">
                  {['Mudah', 'Sedang', 'Sulit'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setKesulitan(level)}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                        kesulitan === level
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jumlah Soal */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">
                  ️ Jumlah Soal Latihan
                </label>
                <select
                  value={jumlahSoal}
                  onChange={(e) => setJumlahSoal(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-[#3D3D3D] bg-white"
                >
                  <option value="3">3 Soal</option>
                  <option value="5">5 Soal</option>
                  <option value="10">10 Soal</option>
                </select>
              </div>

              {/* Fokus Materi */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">
                  🎯 Fokus Materi
                </label>
                <div className="flex gap-2">
                  {['Teori', 'Praktik', 'Keduanya'].map((fokus) => (
                    <button
                      key={fokus}
                      onClick={() => setFokus(fokus)}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                        fokusMateri === fokus
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {fokus}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instruksi Khusus */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">
                  ✏️ Instruksi Khusus (Opsional)
                </label>
                <textarea
                  value={instruksiKhusus}
                  onChange={(e) => setInstruksiKhusus(e.target.value)}
                  placeholder="Contoh: Sertakan diagram, gunakan bahasa daerah, fokus pada contoh nyata, dll..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-[#3D3D3D] bg-white"
                />
              </div>
            </div>

            {/* Tombol Generate */}
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Konten & Ilustrasi</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                ❌ {error}
              </div>
            )}

            {/* Hasil Generate */}
            {generatedContent && (
              <div className="mt-6 space-y-4">
                {/* Ilustrasi */}
                {illustration && (
                  <div className="bg-white rounded-xl p-4 image-hover">
                    <img 
                      src={illustration.url} 
                      alt={illustration.caption}
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="text-sm text-[#7A7A7A] text-center italic">
                      {illustration.caption}
                    </p>
                  </div>
                )}

                {/* Pengantar */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-[#3D3D3D] mb-2">📖 Pengantar</h4>
                  <p className="text-[#3D3D3D]">{generatedContent.pengantar}</p>
                </div>

                {/* Tujuan Pembelajaran */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-[#3D3D3D] mb-2">🎯 Tujuan Pembelajaran</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {generatedContent.tujuanPembelajaran.map((tujuan: string, i: number) => (
                      <li key={i} className="text-[#3D3D3D]">{tujuan}</li>
                    ))}
                  </ul>
                </div>

                {/* Materi Utama */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-[#3D3D3D] mb-2">📚 Materi Utama</h4>
                  <div className="text-[#3D3D3D] whitespace-pre-line leading-relaxed">
                    {generatedContent.materiUtama}
                  </div>
                </div>

                {/* Contoh Kasus */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-[#3D3D3D] mb-2">💡 Contoh Kasus</h4>
                  <p className="text-[#3D3D3D]">{generatedContent.contohKasus}</p>
                </div>

                {/* Rangkuman */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-[#3D3D3D] mb-2">📝 Rangkuman</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {generatedContent.rangkuman.map((poin: string, i: number) => (
                      <li key={i} className="text-[#3D3D3D]">{poin}</li>
                    ))}
                  </ul>
                </div>

                {/* Latihan Soal */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-[#3D3D3D] mb-2">✍️ Latihan Soal</h4>
                  {generatedContent.latihanSoal.map((soal: any, i: number) => (
                    <div key={i} className="mb-4 p-3 bg-[#F7F5F0] rounded-lg">
                      <p className="font-semibold text-[#3D3D3D] mb-2">
                        {i + 1}. {soal.pertanyaan}
                      </p>
                      <div className="space-y-1 ml-4">
                        {soal.pilihan.map((pilihan: string, j: number) => (
                          <div key={j} className="text-[#3D3D3D]">
                            {pilihan}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tombol Simpan */}
                <button
                  onClick={handleSaveContent}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  ✓ Simpan Konten ke Bab Ini
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Konten Materi (yang sudah disimpan) */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {konten ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6 space-y-6 animate-fadeInUp">
            {/* Ilustrasi */}
            {illustration && (
              <div className="image-hover">
                <img 
                  src={illustration.url} 
                  alt={illustration.caption}
                  className="w-full rounded-xl"
                />
                <p className="text-sm text-[#7A7A7A] text-center italic mt-2">
                  {illustration.caption}
                </p>
              </div>
            )}

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
                <h3 className="font-bold text-[#3D3D3D] mb-3">✍️ Latihan Soal</h3>
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
            <p className="text-[#7A7A7A] mb-6">
              Klik tombol <strong>"✨ AI Generate"</strong> di atas untuk membuat konten materi secara otomatis.
            </p>
            <button
              onClick={() => setShowAIPanel(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              ✨ Generate dengan AI
            </button>
          </div>
        )}
      </main>
    </div>
  )
}