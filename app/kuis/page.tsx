'use client'
import { useState, useEffect } from 'react'

export default function HalamanKuis() {
  // Data soal dummy (IPAS Kelas 5 - Sistem Pernapasan)
  const soalList = [
    {
      id: 1,
      pertanyaan: 'Organ pernapasan manusia yang berfungsi untuk menyaring udara adalah...',
      opsi: [
        { id: 'A', teks: 'Paru-paru' },
        { id: 'B', teks: 'Hidung' },
        { id: 'C', teks: 'Tenggorokan' },
        { id: 'D', teks: 'Diafragma' },
      ],
      jawabanBenar: 'B',
      pembahasan: 'Hidung memiliki rambut halus dan lendir yang berfungsi menyaring debu dan kotoran dari udara yang kita hirup.',
    },
    {
      id: 2,
      pertanyaan: 'Proses menghirup udara disebut...',
      opsi: [
        { id: 'A', teks: 'Ekspirasi' },
        { id: 'B', teks: 'Inspirasi' },
        { id: 'C', teks: 'Respirasi' },
        { id: 'D', teks: 'Transpirasi' },
      ],
      jawabanBenar: 'B',
      pembahasan: 'Inspirasi adalah proses menghirup udara (O2) ke dalam paru-paru. Sedangkan ekspirasi adalah proses menghembuskan udara (CO2).',
    },
    {
      id: 3,
      pertanyaan: 'Berapakah hasil dari 3/4 + 1/4?',
      opsi: [
        { id: 'A', teks: '4/8' },
        { id: 'B', teks: '1' },
        { id: 'C', teks: '3/4' },
        { id: 'D', teks: '2/4' },
      ],
      jawabanBenar: 'B',
      pembahasan: '3/4 + 1/4 = 4/4 = 1. Karena penyebutnya sama, kita jumlahkan pembilangnya: 3 + 1 = 4, sehingga 4/4 = 1.',
    },
    {
      id: 4,
      pertanyaan: 'Hewan yang bernapas dengan insang adalah...',
      opsi: [
        { id: 'A', teks: 'Katak' },
        { id: 'B', teks: 'Ikan' },
        { id: 'C', teks: 'Burung' },
        { id: 'D', teks: 'Kucing' },
      ],
      jawabanBenar: 'B',
      pembahasan: 'Ikan bernapas dengan insang yang terletak di sisi kepalanya. Insang berfungsi untuk mengambil oksigen dari dalam air.',
    },
    {
      id: 5,
      pertanyaan: 'Ibu mempunyai 2/5 kg gula, kemudian membeli lagi 1/5 kg. Berapa kg gula ibu sekarang?',
      opsi: [
        { id: 'A', teks: '1/5 kg' },
        { id: 'B', teks: '2/5 kg' },
        { id: 'C', teks: '3/5 kg' },
        { id: 'D', teks: '4/5 kg' },
      ],
      jawabanBenar: 'C',
      pembahasan: '2/5 + 1/5 = 3/5 kg. Karena penyebutnya sama (5), kita cukup menjumlahkan pembilangnya: 2 + 1 = 3.',
    },
  ]

  const [nomorSoal, setNomorSoal] = useState(0)
  const [jawabanDipilih, setJawabanDipilih] = useState<string | null>(null)
  const [sudahDijawab, setSudahDijawab] = useState(false)
  const [skor, setSkor] = useState(0)
  const [jawabanBenarCount, setJawabanBenarCount] = useState(0)
  const [waktuTersisa, setWaktuTersisa] = useState(300) // 5 menit
  const [kuisSelesai, setKuisSelesai] = useState(false)
  const [riwayatJawaban, setRiwayatJawaban] = useState<{soal: number, benar: boolean}[]>([])

  // Timer countdown
  useEffect(() => {
    if (waktuTersisa > 0 && !kuisSelesai) {
      const timer = setInterval(() => {
        setWaktuTersisa(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (waktuTersisa === 0) {
      setKuisSelesai(true)
    }
  }, [waktuTersisa, kuisSelesai])

  const formatWaktu = (detik: number) => {
    const menit = Math.floor(detik / 60)
    const sisaDetik = detik % 60
    return `${menit}:${sisaDetik.toString().padStart(2, '0')}`
  }

  const handlePilihJawaban = (opsiId: string) => {
    if (sudahDijawab) return
    setJawabanDipilih(opsiId)
  }

  const handleCekJawaban = () => {
    if (!jawabanDipilih) return
    
    const soalSekarang = soalList[nomorSoal]
    const benar = jawabanDipilih === soalSekarang.jawabanBenar
    
    setSudahDijawab(true)
    setRiwayatJawaban(prev => [...prev, { soal: nomorSoal + 1, benar }])
    
    if (benar) {
      setSkor(prev => prev + 20)
      setJawabanBenarCount(prev => prev + 1)
    }
  }

  const handleSoalBerikutnya = () => {
    if (nomorSoal < soalList.length - 1) {
      setNomorSoal(prev => prev + 1)
      setJawabanDipilih(null)
      setSudahDijawab(false)
    } else {
      setKuisSelesai(true)
    }
  }

  const handleMulaiUlang = () => {
    setNomorSoal(0)
    setJawabanDipilih(null)
    setSudahDijawab(false)
    setSkor(0)
    setJawabanBenarCount(0)
    setWaktuTersisa(300)
    setKuisSelesai(false)
    setRiwayatJawaban([])
  }

  // Halaman Selesai
  if (kuisSelesai) {
    const persentase = Math.round((jawabanBenarCount / soalList.length) * 100)
    const pesan = persentase >= 80 ? 'Luar Biasa! 🌟' : persentase >= 60 ? 'Bagus! 👍' : 'Ayo Belajar Lagi! 💪'
    
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl w-full border border-[#E8E4DD]">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold text-[#3D3D3D] mb-2">Kuis Selesai!</h1>
            <p className="text-xl text-[#5B8C5A] font-semibold">{pesan}</p>
          </div>

          {/* Skor */}
          <div className="bg-gradient-to-br from-[#5B8C5A] to-[#4A7349] rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Skor Kamu</p>
                <p className="text-5xl font-bold">{skor}</p>
                <p className="text-sm opacity-90">dari 100 poin</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Jawaban Benar</p>
                <p className="text-4xl font-bold">{jawabanBenarCount}/{soalList.length}</p>
                <p className="text-sm opacity-90">{persentase}%</p>
              </div>
            </div>
          </div>

          {/* Review Jawaban */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-3">📋 Review Jawaban</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {riwayatJawaban.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${
                  item.benar ? 'bg-[#B8D4B8]' : 'bg-[#E8C4C4]'
                }`}>
                  <span className="font-semibold text-[#3D3D3D]">Soal {item.soal}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.benar ? 'bg-[#5B8C5A] text-white' : 'bg-[#C97B7B] text-white'
                  }`}>
                    {item.benar ? '✓ Benar' : '✗ Salah'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3">
            <button
              onClick={handleMulaiUlang}
              className="flex-1 bg-[#5B8C5A] text-white py-3 rounded-xl font-semibold hover:bg-[#4A7349] transition"
            >
              🔄 Coba Lagi
            </button>
            <button
              onClick={() => window.location.href = '/dashboard/siswa'}
              className="flex-1 bg-[#F0EDE6] text-[#3D3D3D] py-3 rounded-xl font-semibold hover:bg-[#E8E4DD] transition"
            >
              🏠 Ke Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Halaman Kuis Aktif
  const soalSekarang = soalList[nomorSoal]
  const progress = ((nomorSoal + (sudahDijawab ? 1 : 0)) / soalList.length) * 100

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header Kuis */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#E8E4DD]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-[#3D3D3D]">Kuis IPAS - Sistem Pernapasan</h1>
              <p className="text-sm text-[#7A7A7A]">Kelas 5 • 5 Soal</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${
                waktuTersisa < 60 ? 'bg-[#E8C4C4] text-[#5A3D3D]' : 'bg-[#F0EDE6] text-[#3D3D3D]'
              }`}>
                <span>⏱️</span>
                <span>{formatWaktu(waktuTersisa)}</span>
              </div>
              {/* Skor */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B8D4B8] text-[#3D5A3D] font-semibold">
                <span>⭐</span>
                <span>{skor} poin</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#E8E4DD] rounded-full h-2">
            <div 
              className="bg-[#5B8C5A] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-[#7A7A7A] mt-1">
            Soal {nomorSoal + 1} dari {soalList.length}
          </p>
        </div>
      </header>

      {/* Konten Kuis */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E8E4DD]">
          {/* Nomor Soal & Pertanyaan */}
          <div className="mb-6">
            <div className="inline-block bg-[#5B8C5A] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Soal {nomorSoal + 1}
            </div>
            <h2 className="text-2xl font-bold text-[#3D3D3D] leading-relaxed">
              {soalSekarang.pertanyaan}
            </h2>
          </div>

          {/* Pilihan Jawaban */}
          <div className="space-y-3 mb-6">
            {soalSekarang.opsi.map((opsi) => {
              const isSelected = jawabanDipilih === opsi.id
              const isCorrect = sudahDijawab && opsi.id === soalSekarang.jawabanBenar
              const isWrong = sudahDijawab && isSelected && opsi.id !== soalSekarang.jawabanBenar

              return (
                <button
                  key={opsi.id}
                  onClick={() => handlePilihJawaban(opsi.id)}
                  disabled={sudahDijawab}
                  className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-4 ${
                    isCorrect
                      ? 'border-[#5B8C5A] bg-[#B8D4B8]'
                      : isWrong
                      ? 'border-[#C97B7B] bg-[#E8C4C4]'
                      : isSelected
                      ? 'border-[#5B8C5A] bg-[#F0EDE6]'
                      : 'border-[#E8E4DD] bg-white hover:border-[#5B8C5A] hover:bg-[#FAFAF8]'
                  } ${sudahDijawab ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    isCorrect
                      ? 'bg-[#5B8C5A] text-white'
                      : isWrong
                      ? 'bg-[#C97B7B] text-white'
                      : isSelected
                      ? 'bg-[#5B8C5A] text-white'
                      : 'bg-[#F0EDE6] text-[#3D3D3D]'
                  }`}>
                    {isCorrect ? '✓' : isWrong ? '' : opsi.id}
                  </div>
                  <span className="text-lg font-semibold text-[#3D3D3D]">{opsi.teks}</span>
                </button>
              )
            })}
          </div>

          {/* Feedback & Pembahasan */}
          {sudahDijawab && (
            <div className={`p-6 rounded-xl mb-6 ${
              jawabanDipilih === soalSekarang.jawabanBenar
                ? 'bg-[#B8D4B8] border-2 border-[#5B8C5A]'
                : 'bg-[#E8C4C4] border-2 border-[#C97B7B]'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">
                  {jawabanDipilih === soalSekarang.jawabanBenar ? '🎉' : '💡'}
                </span>
                <h3 className="text-lg font-bold text-[#3D3D3D]">
                  {jawabanDipilih === soalSekarang.jawabanBenar ? 'Benar! +20 poin' : 'Kurang Tepat'}
                </h3>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-[#3D3D3D] mb-1">📖 Pembahasan:</p>
                <p className="text-[#3D3D3D]">{soalSekarang.pembahasan}</p>
              </div>
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex justify-end">
            {!sudahDijawab ? (
              <button
                onClick={handleCekJawaban}
                disabled={!jawabanDipilih}
                className={`px-8 py-3 rounded-xl font-semibold transition ${
                  jawabanDipilih
                    ? 'bg-[#5B8C5A] text-white hover:bg-[#4A7349]'
                    : 'bg-[#E8E4DD] text-[#7A7A7A] cursor-not-allowed'
                }`}
              >
                ✓ Cek Jawaban
              </button>
            ) : (
              <button
                onClick={handleSoalBerikutnya}
                className="px-8 py-3 rounded-xl font-semibold bg-[#5B8C5A] text-white hover:bg-[#4A7349] transition"
              >
                {nomorSoal < soalList.length - 1 ? 'Soal Berikutnya →' : 'Selesai 🏆'}
              </button>
            )}
          </div>
        </div>

        {/* Navigasi Soal */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-4 border border-[#E8E4DD]">
          <p className="text-sm font-semibold text-[#7A7A7A] mb-3">Navigasi Soal:</p>
          <div className="flex gap-2 flex-wrap">
            {soalList.map((_, index) => {
              const jawaban = riwayatJawaban[index]
              return (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm ${
                    index === nomorSoal
                      ? 'bg-[#5B8C5A] text-white'
                      : jawaban
                      ? jawaban.benar
                        ? 'bg-[#B8D4B8] text-[#3D5A3D]'
                        : 'bg-[#E8C4C4] text-[#5A3D3D]'
                      : 'bg-[#F0EDE6] text-[#7A7A7A]'
                  }`}
                >
                  {index + 1}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}