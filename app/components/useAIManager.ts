'use client'
import { useState } from 'react'

export interface MateriContent {
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

export interface ImageResult {
  url: string
  caption: string
}

// Mock data untuk fallback
const kontenMock: Record<string, MateriContent> = {
  'Pendahuluan': {
    pengantar: 'Selamat datang di pelajaran IPAS! Pada bab ini, kita akan mengenal apa itu IPAS dan mengapa ilmu ini penting dalam kehidupan sehari-hari. 🌟',
    tujuanPembelajaran: [
      'Memahami pengertian IPAS',
      'Mengetahui manfaat mempelajari IPAS',
      'Mengenal metode ilmiah sederhana',
    ],
    materiUtama: `IPAS adalah singkatan dari Ilmu Pengetahuan Alam dan Sosial. Ilmu ini membantu kita memahami dunia di sekitar kita.

🌍 ALAM SEKITAR KITA
Alam adalah segala sesuatu yang ada di sekitar kita, baik yang hidup maupun tidak hidup. Contohnya:
- Makhluk hidup: manusia, hewan, tumbuhan
- Benda tidak hidup: batu, air, udara

🔬 METODE ILMIAH SEDERHANA
Untuk mempelajari alam, kita bisa menggunakan langkah-langkah berikut:
1. AMATI - Lihat dengan teliti
2. TANYA - Ajukan pertanyaan
3. COBA - Lakukan percobaan sederhana
4. SIMPULKAN - Tarik kesimpulan

💡 CONTOH SEDERHANA
Coba amati tanaman di sekitarmu:
- Apa warna daunnya?
- Apakah daunnya lebar atau sempit?
- Di mana tanaman itu tumbuh?

Dengan mengamati, kamu sudah menjadi ilmuwan kecil!`,
    contohKasus: 'Budi mengamati semut di halaman sekolah. Ia melihat semut membawa makanan ke sarangnya. Budi bertanya: "Ke mana semut-semut itu pergi?" Ini adalah contoh metode ilmiah sederhana! 🐜',
    rangkuman: [
      'IPAS membantu kita memahami alam dan sosial',
      'Alam terdiri dari makhluk hidup dan benda tidak hidup',
      'Metode ilmiah: Amati, Tanya, Coba, Simpulkan',
      'Kita bisa menjadi ilmuwan dengan mengamati sekitar',
    ],
    latihanSoal: [
      { pertanyaan: 'Apa kepanjangan dari IPAS?', pilihan: ['A. Ilmu Pengetahuan Alam dan Sosial', 'B. Ilmu Pengetahuan Alam Saja', 'C. Ilmu Pengetahuan Sosial', 'D. Ilmu Pasti Alam Sosial'], jawaban: 0 },
      { pertanyaan: 'Manakah yang termasuk makhluk hidup?', pilihan: ['A. Batu', 'B. Air', 'C. Pohon', 'D. Udara'], jawaban: 2 },
      { pertanyaan: 'Langkah pertama metode ilmiah adalah...', pilihan: ['A. Tanya', 'B. Amati', 'C. Coba', 'D. Simpulkan'], jawaban: 1 },
    ],
  },
  'Organ Pernapasan Manusia': {
    pengantar: 'Setiap hari kita bernapas tanpa henti. Tapi tahukah kamu organ apa saja yang membantu kita bernapas? Mari kita pelajari bersama! ',
    tujuanPembelajaran: [
      'Mengenal organ-organ pernapasan manusia',
      'Memahami fungsi masing-masing organ',
      'Menjaga kesehatan sistem pernapasan',
    ],
    materiUtama: `SISTEM PERNAPASAN MANUSIA

Kita bernapas sekitar 20.000 kali sehari! Udara masuk melalui hidung, lalu melewati beberapa organ penting.

👃 HIDUNG
Hidung adalah pintu masuk udara. Di dalam hidung terdapat:
- Rambut halus: menyaring debu
- Selaput lendir: menghangatkan udara

🫁 TENGGOROKAN (FARING)
Setelah hidung, udara masuk ke tenggorokan.

🌬️ BATANG TENGGOROKAN (TRAKEA)
Batang tenggorokan seperti pipa yang mengalirkan udara ke paru-paru.

🫁 PARU-PARU
Paru-paru adalah organ utama pernapasan. Di dalam paru-paru terdapat:
- Bronkus (cabang batang tenggorokan)
- Bronkiolus (cabang kecil)
- Alveolus (kantong udara kecil)

Di ALVEOLUS terjadi pertukaran oksigen dan karbondioksida!`,
    contohKasus: 'Saat kamu berlari, napasmu menjadi cepat dan dalam. Ini karena tubuhmu butuh lebih banyak oksigen untuk menghasilkan energi. Paru-paru bekerja lebih keras! 🏃',
    rangkuman: [
      'Hidung menyaring dan menghangatkan udara',
      'Tenggorokan menghubungkan hidung dengan paru-paru',
      'Paru-paru adalah organ utama pernapasan',
      'Alveolus tempat pertukaran oksigen dan karbondioksida',
    ],
    latihanSoal: [
      { pertanyaan: 'Organ yang pertama kali dilalui udara saat bernapas adalah...', pilihan: ['A. Paru-paru', 'B. Hidung', 'C. Tenggorokan', 'D. Alveolus'], jawaban: 1 },
      { pertanyaan: 'Tempat pertukaran oksigen dan karbondioksida terjadi di...', pilihan: ['A. Hidung', 'B. Tenggorokan', 'C. Bronkus', 'D. Alveolus'], jawaban: 3 },
      { pertanyaan: 'Fungsi rambut halus di hidung adalah...', pilihan: ['A. Menghangatkan udara', 'B. Menyaring debu', 'C. Menghasilkan lendir', 'D. Mencium bau'], jawaban: 1 },
    ],
  },
}

const kontenDefault: MateriContent = {
  pengantar: 'Selamat mempelajari bab ini! Mari kita mulai petualangan ilmu pengetahuan. 📚',
  tujuanPembelajaran: [
    'Memahami konsep dasar bab ini',
    'Mampu menjelaskan dengan kata-kata sendiri',
    'Menerapkan dalam kehidupan sehari-hari',
  ],
  materiUtama: 'Konten untuk bab ini sedang dalam pengembangan. Silakan cek kembali nanti untuk materi lengkap.',
  contohKasus: 'Contoh kasus akan ditambahkan sesuai dengan topik bab ini.',
  rangkuman: ['Poin penting pertama', 'Poin penting kedua', 'Poin penting ketiga'],
  latihanSoal: [
    { pertanyaan: 'Apa yang kamu pelajari dari bab ini?', pilihan: ['A. Banyak hal baru', 'B. Sedikit hal', 'C. Tidak ada', 'D. Bingung'], jawaban: 0 },
  ],
}

function getMockContent(topik: string): MateriContent {
  const matchedKey = Object.keys(kontenMock).find(key => 
    topik.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(topik.toLowerCase())
  )

  if (matchedKey) {
    return kontenMock[matchedKey]
  }

  return {
    ...kontenDefault,
    pengantar: `Selamat mempelajari "${topik}"! Mari kita mulai petualangan ilmu pengetahuan. 📚`,
  }
}

export function useAIManager() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateMateri = async (
    judulBab: string,
    mapel: string,
    kelas: string,
    topik: string
  ): Promise<MateriContent | null> => {
    setIsGenerating(true)
    setError(null)

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      
      console.log('🔑 API Key tersedia:', !!apiKey)
      console.log(' API Key length:', apiKey?.length)

      if (!apiKey) {
        console.warn('⚠️ API Key tidak ada, menggunakan mock data')
        return getMockContent(topik)
      }

      const prompt = `Buatkan materi pembelajaran untuk siswa SD kelas ${kelas} dengan detail berikut:
- Mata Pelajaran: ${mapel}
- Judul Bab: ${judulBab}
- Topik: ${topik}

Gunakan bahasa yang sederhana, menarik, dan mudah dipahami siswa SD kelas ${kelas}.
Sertakan emoji yang relevan untuk membuat materi lebih menarik.

WAJIB output dalam format JSON berikut (tanpa markdown, tanpa backtick):
{
  "pengantar": "Paragraf pembuka yang menarik (2-3 kalimat) dengan emoji",
  "tujuanPembelajaran": ["tujuan1", "tujuan2", "tujuan3"],
  "materiUtama": "Penjelasan lengkap materi (300-500 kata, bahasa sederhana, dengan emoji dan subjudul)",
  "contohKasus": "Contoh nyata yang relevan dengan kehidupan siswa SD",
  "rangkuman": ["poin1", "poin2", "poin3", "poin4"],
  "latihanSoal": [
    {
      "pertanyaan": "Soal pilihan ganda 1",
      "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "jawaban": 0
    },
    {
      "pertanyaan": "Soal pilihan ganda 2",
      "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "jawaban": 1
    },
    {
      "pertanyaan": "Soal pilihan ganda 3",
      "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "jawaban": 2
    }
  ]
}

PENTING: 
- Jawaban harus indeks array (0=A, 1=B, 2=C, 3=D)
- Hanya output JSON, tanpa teks lain
- Pastikan JSON valid`

      // Coba beberapa model Gemini
      const models = [
        'gemini-1.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash-latest',
      ]

      let content: MateriContent | null = null

      for (const model of models) {
        try {
          console.log(` Mencoba model: ${model}`)
          
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 2048,
                },
              }),
            }
          )

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}))
            const errMsg = errData?.error?.message || `Status ${response.status}`
            console.warn(`⚠️ Model ${model} gagal: ${errMsg}`)
            continue
          }

          const data = await response.json()
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text
          
          if (!text) {
            console.warn(`⚠️ Model ${model}: response kosong`)
            continue
          }

          console.log('✅ AI Response berhasil dari model:', model)
          
          const jsonMatch = text.match(/\{[\s\S]*\}/)
          if (!jsonMatch) {
            console.warn(`️ Model ${model}: format tidak valid`)
            continue
          }

          content = JSON.parse(jsonMatch[0])
          
          if (!content.pengantar || !content.materiUtama) {
            console.warn(`⚠️ Model ${model}: struktur tidak lengkap`)
            continue
          }

          break
        } catch (err) {
          console.warn(`⚠️ Error di model ${model}:`, err)
          continue
        }
      }

      if (!content) {
        console.warn('⚠️ Semua model AI gagal, menggunakan mock data')
        content = getMockContent(topik)
      }

      return content

    } catch (err: any) {
      console.error('❌ AI Error:', err)
      setError(err.message || 'Terjadi kesalahan')
      return getMockContent(topik)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateImage = async (topik: string): Promise<ImageResult | null> => {
    try {
      const images = [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
      ]
      const randomImage = images[Math.floor(Math.random() * images.length)]
      
      return {
        url: randomImage,
        caption: `Ilustrasi: ${topik}`,
      }
    } catch {
      return {
        url: `https://via.placeholder.com/800x600/6B9BB8/FFFFFF?text=${encodeURIComponent(topik)}`,
        caption: `Ilustrasi: ${topik}`,
      }
    }
  }

  return {
    isGenerating,
    error,
    generateMateri,
    generateImage,
  }
}