'use client'
import { useState } from 'react'
import { useGuruManager } from '@/app/components/useGuruManager'

export default function ManajemenGuru() {
  const { guruList, tambahGuru, editGuru, hapusGuru, resetGuru } = useGuruManager()
  
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    role: 'guru' as 'guru' | 'walikelas',
    mapel: '',
    kelas: '',
    email: '',
    password: '123456',
  })

  const resetForm = () => {
    setFormData({
      nama: '',
      nip: '',
      role: 'guru',
      mapel: '',
      kelas: '',
      email: '',
      password: '123456',
    })
    setEditId(null)
    setShowForm(false)
    setShowPassword(false)
  }

  const handleSubmit = () => {
    if (!formData.nama || !formData.nip || !formData.email) {
      alert('Nama, NIP, dan Email wajib diisi!')
      return
    }

    if (formData.role === 'guru' && !formData.mapel) {
      alert('Mata pelajaran wajib diisi untuk guru!')
      return
    }

    if (formData.role === 'walikelas' && !formData.kelas) {
      alert('Kelas wajib diisi untuk wali kelas!')
      return
    }

    if (editId) {
      editGuru(editId, formData)
    } else {
      tambahGuru(formData)
    }
    resetForm()
  }

  const handleEdit = (guru: any) => {
    setFormData(guru)
    setEditId(guru.id)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#3D3D3D]">👨‍🏫 Manajemen Guru & Wali Kelas</h1>
            <p className="text-[#7A7A7A]">Kelola data guru dan wali kelas</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-[#F0EDE6] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#E8E4DD]"
          >
            ← Kembali
          </button>
        </div>

        {/* Banner Info */}
        <div className="bg-gradient-to-r from-[#5B8C5A] to-[#4A7349] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">💡 Fitur Manajemen Guru</h2>
          <ul className="space-y-1 opacity-90 text-sm">
            <li>✅ Tambah guru baru (Guru Mapel atau Wali Kelas)</li>
            <li>✅ Edit data guru</li>
            <li>✅ Hapus guru</li>
            <li>✅ Assign mata pelajaran untuk guru</li>
            <li>✅ Assign kelas untuk wali kelas</li>
          </ul>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition"
            >
              + Tambah Guru
            </button>
            <button
              onClick={resetGuru}
              className="px-4 py-2 bg-[#F0EDE6] text-[#7A7A7A] rounded-xl font-semibold hover:bg-[#E8E4DD] transition"
            >
               Reset
            </button>
          </div>
        </div>

        {/* Form Tambah/Edit dengan LABEL */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#5B8C5A] p-6 mb-6">
            <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">
              {editId ? '✏️ Edit Guru' : '➕ Tambah Guru Baru'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Nama */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">
                  👤 Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bu Sari Wijaya"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                />
              </div>

              {/* NIP */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">
                  🆔 NIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 198803152011012001"
                  value={formData.nip}
                  onChange={(e) => setFormData({...formData, nip: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">
                   Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Contoh: sari@sdsp.sch.id"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                />
              </div>

              {/* Password dengan Toggle Mata */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">
                  🔒 Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 pr-12 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#5B8C5A] transition"
                    title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">
                  🎭 Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as 'guru' | 'walikelas', mapel: '', kelas: ''})}
                  className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                >
                  <option value="guru">‍🏫 Guru Mata Pelajaran</option>
                  <option value="walikelas">👩‍🏫 Wali Kelas</option>
                </select>
              </div>

              {/* Mapel atau Kelas */}
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-1">
                  {formData.role === 'guru' ? '📚 Mata Pelajaran' : '🏫 Kelas'} <span className="text-red-500">*</span>
                </label>
                {formData.role === 'guru' ? (
                  <select
                    value={formData.mapel}
                    onChange={(e) => setFormData({...formData, mapel: e.target.value})}
                    className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                  >
                    <option value="">-- Pilih Mata Pelajaran --</option>
                    <option value="IPAS">IPAS</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Agama Katolik">Agama Katolik</option>
                    <option value="PJOK">PJOK</option>
                    <option value="Seni Budaya">Seni Budaya</option>
                  </select>
                ) : (
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                    className="w-full px-4 py-3 border border-[#E8E4DD] rounded-xl focus:outline-none focus:border-[#5B8C5A] text-[#3D3D3D] bg-white"
                  >
                    <option value="">-- Pilih Kelas --</option>
                    <option value="1A">Kelas 1A</option>
                    <option value="1B">Kelas 1B</option>
                    <option value="2A">Kelas 2A</option>
                    <option value="2B">Kelas 2B</option>
                    <option value="3A">Kelas 3A</option>
                    <option value="3B">Kelas 3B</option>
                    <option value="4A">Kelas 4A</option>
                    <option value="4B">Kelas 4B</option>
                    <option value="5A">Kelas 5A</option>
                    <option value="5B">Kelas 5B</option>
                    <option value="5C">Kelas 5C</option>
                    <option value="6A">Kelas 6A</option>
                    <option value="6B">Kelas 6B</option>
                  </select>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#5B8C5A] text-white rounded-xl font-semibold hover:bg-[#4A7349] transition"
              >
                ✓ Simpan
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-[#E8E4DD] text-[#3D3D3D] rounded-xl font-semibold hover:bg-[#D4D0C8] transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Daftar Guru */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">
             Daftar Guru ({guruList.length} guru)
          </h3>
          <div className="space-y-3">
            {guruList.map((guru) => (
              <div
                key={guru.id}
                className="flex items-center gap-4 p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E4DD]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C5A] to-[#4A7349] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {guru.nama.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#3D3D3D]">{guru.nama}</h4>
                  <p className="text-sm text-[#7A7A7A]">NIP: {guru.nip} • {guru.email}</p>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      guru.role === 'guru' 
                        ? 'bg-[#B8D4B8] text-[#3D5A3D]' 
                        : 'bg-[#B8D4E3] text-[#3D5A7A]'
                    }`}>
                      {guru.role === 'guru' ? '👨‍ Guru' : '👩‍ Wali Kelas'}
                    </span>
                    {guru.mapel && (
                      <span className="text-xs px-2 py-1 bg-[#F5E6C8] text-[#7A5A2A] rounded-full">
                         {guru.mapel}
                      </span>
                    )}
                    {guru.kelas && (
                      <span className="text-xs px-2 py-1 bg-[#E8C4C4] text-[#5A3D3D] rounded-full">
                        🏫 Kelas {guru.kelas}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(guru)}
                    className="p-2 text-[#6B9BB8] hover:bg-[#B8D4E3] rounded-lg"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus ${guru.nama}?`)) {
                        hapusGuru(guru.id)
                      }
                    }}
                    className="p-2 text-[#C97B7B] hover:bg-[#E8C4C4] rounded-lg"
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}