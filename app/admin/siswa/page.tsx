'use client'
import { useState, useRef } from 'react'
import { useSiswaManager } from '@/app/components/useSiswaManager'

export default function ManajemenSiswa() {
  const { 
    siswaList, tambahSiswa, editSiswa, hapusSiswa,
    importDariCSV, exportKeCSV, resetSiswa
  } = useSiswaManager()
  
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [filterKelas, setFilterKelas] = useState('semua')
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    nis: '',
    nama: '',
    kelas: '4A',
    jenisKelamin: 'L' as 'L' | 'P',
    tempatLahir: '',
    tanggalLahir: '',
    namaAyah: '',
    namaIbu: '',
    noHpOrtu: '',
    alamat: '',
    agama: 'Katolik',
  })

  const daftarKelas = Array.from(new Set(siswaList.map(s => s.kelas))).sort()

  const filteredSiswa = siswaList.filter(s => {
    const matchKelas = filterKelas === 'semua' || s.kelas === filterKelas
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || 
                       s.nis.includes(search)
    return matchKelas && matchSearch
  })

  const resetForm = () => {
    setFormData({
      nis: '', nama: '', kelas: '4A', jenisKelamin: 'L',
      tempatLahir: '', tanggalLahir: '', namaAyah: '',
      namaIbu: '', noHpOrtu: '', alamat: '', agama: 'Katolik',
    })
    setEditId(null)
    setShowForm(false)
  }

  const handleSubmit = () => {
    if (!formData.nis || !formData.nama || !formData.kelas) {
      alert('NIS, Nama, dan Kelas wajib diisi!')
      return
    }

    if (editId) {
      editSiswa(editId, formData)
    } else {
      tambahSiswa(formData)
    }
    resetForm()
  }

  const handleEdit = (siswa: any) => {
    setFormData(siswa)
    setEditId(siswa.id)
    setShowForm(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      importDariCSV(text)
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const downloadTemplate = () => {
    const template = 'NIS,Nama,Kelas,JenisKelamin(L/P),TempatLahir,TanggalLahir(YYYY-MM-DD),NamaAyah,NamaIbu,NoHpOrtu,Alamat,Agama\n2024006,Contoh Siswa,4A,L,Jakarta,2016-01-01,Bapak Contoh,Ibu Contoh,081234567890,Jl. Contoh No. 1,Katolik'
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template_data_siswa.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#3D3D3D]">👦 Manajemen Siswa</h1>
            <p className="text-[#7A7A7A]">Kelola data siswa dengan mudah</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD]"
          >
            ← Kembali
          </button>
        </div>

        {/* Banner Info */}
        <div className="bg-gradient-to-r from-[#6B9BB8] to-[#5A8AA7] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">💡 Fitur Manajemen Siswa</h2>
          <ul className="space-y-1 opacity-90 text-sm">
            <li>✅ Tambah/edit/hapus data siswa secara manual</li>
            <li>✅ Upload file CSV untuk import banyak siswa sekaligus</li>
            <li>✅ Export data siswa ke file CSV</li>
            <li>✅ Download template CSV untuk format yang benar</li>
            <li>✅ Filter berdasarkan kelas & pencarian nama/NIS</li>
          </ul>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[#6B9BB8] text-white rounded-xl font-semibold hover:bg-[#5A8AA7] transition"
            >
              + Tambah Siswa
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition"
            >
              📤 Upload CSV
            </button>

            <button
              onClick={exportKeCSV}
              className="px-6 py-2 bg-[#D4B896] text-white rounded-xl font-semibold hover:bg-[#C4A886] transition"
            >
              📥 Export CSV
            </button>

            <button
              onClick={downloadTemplate}
              className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD] transition text-sm"
            >
              📄 Download Template
            </button>

            <button
              onClick={resetSiswa}
              className="px-4 py-2 bg-[#F0EDE6] text-[#7A7A7A] rounded-xl font-semibold hover:bg-[#E8E4DD] transition text-sm"
            >
               Reset
            </button>

            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Cari nama/NIS..."
                className="w-full px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white"
              />
            </div>

            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="px-4 py-2 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white"
            >
              <option value="semua">Semua Kelas</option>
              {daftarKelas.map((k, i) => (
                <option key={i} value={k}>Kelas {k}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Tambah/Edit */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#6B9BB8] p-6 mb-6">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">
              {editId ? '✏️ Edit Siswa' : '➕ Tambah Siswa Baru'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">🆔 NIS <span className="text-red-500">*</span></label>
                <input type="text" placeholder="2024001" value={formData.nis}
                  onChange={(e) => setFormData({...formData, nis: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">👤 Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Nama siswa" value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">🏫 Kelas <span className="text-red-500">*</span></label>
                <select value={formData.kelas}
                  onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white">
                  {['1A','1B','2A','2B','3A','3B','4A','4B','5A','5B','5C','6A','6B'].map(k => (
                    <option key={k} value={k}>Kelas {k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">⚧ Jenis Kelamin</label>
                <select value={formData.jenisKelamin}
                  onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value as 'L' | 'P'})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white">
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">📍 Tempat Lahir</label>
                <input type="text" placeholder="Kota" value={formData.tempatLahir}
                  onChange={(e) => setFormData({...formData, tempatLahir: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">📅 Tanggal Lahir</label>
                <input type="date" value={formData.tanggalLahir}
                  onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">👨 Nama Ayah</label>
                <input type="text" placeholder="Nama ayah" value={formData.namaAyah}
                  onChange={(e) => setFormData({...formData, namaAyah: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">👩 Nama Ibu</label>
                <input type="text" placeholder="Nama ibu" value={formData.namaIbu}
                  onChange={(e) => setFormData({...formData, namaIbu: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">📱 No. HP Orang Tua</label>
                <input type="text" placeholder="08xxxxxxxxxx" value={formData.noHpOrtu}
                  onChange={(e) => setFormData({...formData, noHpOrtu: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1"> Alamat</label>
                <input type="text" placeholder="Alamat lengkap" value={formData.alamat}
                  onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1"> Agama</label>
                <select value={formData.agama}
                  onChange={(e) => setFormData({...formData, agama: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#6B9BB8] text-[#3D3D3D] bg-white">
                  <option value="Katolik">Katolik</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Islam">Islam</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmit}
                className="px-6 py-3 bg-[#6B9BB8] text-white rounded-xl font-semibold hover:bg-[#5A8AA7] transition">
                ✓ Simpan
              </button>
              <button onClick={resetForm}
                className="px-6 py-3 bg-[#E8E4DD] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#D4D0C8] transition">
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Daftar Siswa */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-bold text-[#3D3D3D]">
              📋 Daftar Siswa ({filteredSiswa.length} dari {siswaList.length} siswa)
            </h3>
            <div className="flex gap-2 text-xs flex-wrap">
              <span className="px-3 py-1 bg-[#B8D4B8] text-[#3D5A3D] rounded-full font-semibold">
                👦 Laki-laki: {siswaList.filter(s => s.jenisKelamin === 'L').length}
              </span>
              <span className="px-3 py-1 bg-[#E8C4C4] text-[#5A3D3D] rounded-full font-semibold">
                👧 Perempuan: {siswaList.filter(s => s.jenisKelamin === 'P').length}
              </span>
            </div>
          </div>

          {filteredSiswa.length === 0 ? (
            <div className="text-center py-12 text-[#7A7A7A]">
              <div className="text-5xl mb-4"></div>
              <p className="text-lg">Tidak ada data siswa</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F7F5F0] border-b border-[#E8E4DD]">
                    <th className="text-left p-3 font-semibold text-[#3D3D3D]">NIS</th>
                    <th className="text-left p-3 font-semibold text-[#3D3D3D]">Nama</th>
                    <th className="text-left p-3 font-semibold text-[#3D3D3D]">Kelas</th>
                    <th className="text-left p-3 font-semibold text-[#3D3D3D]">L/P</th>
                    <th className="text-left p-3 font-semibold text-[#3D3D3D]">Orang Tua</th>
                    <th className="text-left p-3 font-semibold text-[#3D3D3D]">No. HP</th>
                    <th className="text-center p-3 font-semibold text-[#3D3D3D]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.map((siswa) => (
                    <tr key={siswa.id} className="border-b border-[#E8E4DD] hover:bg-[#FAFAF8]">
                      <td className="p-3 font-mono text-xs">{siswa.nis}</td>
                      <td className="p-3 font-semibold text-[#3D3D3D]">{siswa.nama}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-[#B8D4E3] text-[#3D5A7A] rounded-full text-xs font-semibold">
                          {siswa.kelas}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          siswa.jenisKelamin === 'L' ? 'bg-[#B8D4E3] text-[#3D5A7A]' : 'bg-[#E8C4C4] text-[#5A3D3D]'
                        }`}>
                          {siswa.jenisKelamin === 'L' ? '👦 L' : '👧 P'}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-[#7A7A7A]">
                        <div>{siswa.namaAyah}</div>
                        <div>{siswa.namaIbu}</div>
                      </td>
                      <td className="p-3 text-xs font-mono">{siswa.noHpOrtu}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => handleEdit(siswa)}
                          className="p-1 text-[#6B9BB8] hover:bg-[#B8D4E3] rounded" title="Edit">✏️</button>
                        <button onClick={() => {
                          if (confirm(`Hapus ${siswa.nama}?`)) hapusSiswa(siswa.id)
                        }} className="p-1 text-[#C97B7B] hover:bg-[#E8C4C4] rounded ml-1" title="Hapus">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Upload */}
        <div className="mt-6 bg-[#B8D4E3] border-2 border-[#6B9BB8] rounded-2xl p-4 text-[#3D5A7A]">
          <p className="text-sm font-semibold mb-2">📄 Format Upload CSV:</p>
          <p className="text-xs">
            File CSV harus memiliki kolom: <strong>NIS, Nama, Kelas, JenisKelamin, TempatLahir, TanggalLahir, NamaAyah, NamaIbu, NoHpOrtu, Alamat, Agama</strong>
          </p>
          <p className="text-xs mt-2">
             Klik tombol <strong>"📄 Download Template"</strong> untuk mendapat contoh format yang benar.
          </p>
        </div>
      </div>
    </div>
  )
}