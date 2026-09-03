'use client'
import { useState } from 'react'

export default function Home() {
  const [loginAs, setLoginAs] = useState<'siswa' | 'guru' | 'ortu'>('siswa')

  return (
    <div className="min-h-screen flex">
      {/* BAGIAN KIRI - Branding (Centered & Clean) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-700 via-green-600 to-red-700 relative overflow-hidden">
        
        {/* Subtle Pattern (Lebih Jelas) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>

        {/* Content - Centered */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          
          {/* Logo Besar */}
          <div className="w-48 h-48 bg-green-700 rounded-full flex items-center justify-center shadow-2xl border-8 border-yellow-400 mb-8">
            <span className="text-yellow-400 text-8xl font-bold">SP</span>
          </div>

          <h1 className="text-6xl font-bold mb-4 text-center">
            Buku Digital
          </h1>
          <h2 className="text-4xl font-semibold mb-6 text-center text-yellow-300">
            SD Katolik Santo Paulus
          </h2>
          <p className="text-2xl italic text-center mb-12 text-yellow-100">
            "In Omnibus Caritas"
          </p>

          {/* Fitur Unggulan - Grid Rapi */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition">
              <div className="text-4xl mb-3">📱</div>
              <p className="text-lg font-semibold">Akses Kapan Saja</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition">
              <div className="text-4xl mb-3"></div>
              <p className="text-lg font-semibold">Belajar Interaktif</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-lg font-semibold">Progress Real-time</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition">
              <div className="text-4xl mb-3">🏆</div>
              <p className="text-lg font-semibold">Gamifikasi</p>
            </div>
          </div>

          {/* Nilai Sekolah - Ganti dengan Disiplin, Sederhana, Kerja Keras */}
          <div className="mt-12 flex gap-8">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-600 rounded-full shadow-lg"></div>
              <span className="text-lg font-semibold">Disiplin</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-600 rounded-full shadow-lg"></div>
              <span className="text-lg font-semibold">Sederhana</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-yellow-400 rounded-full shadow-lg"></div>
              <span className="text-lg font-semibold">Kerja Keras</span>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN - Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          
          {/* Logo Mobile (Hanya muncul di layar kecil) */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-green-700 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-400">
              <span className="text-yellow-400 text-4xl font-bold">SP</span>
            </div>
            <h1 className="text-3xl font-bold text-red-700 mt-4">Buku Digital</h1>
            <h2 className="text-xl text-green-700">SD Katolik Santo Paulus</h2>
          </div>

          {/* Pilihan Login */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setLoginAs('siswa')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                loginAs === 'siswa'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              👦 Siswa
            </button>
            <button
              onClick={() => setLoginAs('guru')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                loginAs === 'guru'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              👩‍🏫 Guru
            </button>
            <button
              onClick={() => setLoginAs('ortu')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                loginAs === 'ortu'
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              👨‍👩‍ Ortu
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {loginAs === 'siswa' ? 'NIS (Nomor Induk Siswa)' : 
                 loginAs === 'guru' ? 'NIP (Nomor Induk Pegawai)' : 'Email'}
              </label>
              <input
                type="text"
                placeholder={loginAs === 'siswa' ? 'Masukkan NIS' : 
                            loginAs === 'guru' ? 'Masukkan NIP' : 'Masukkan email'}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none transition bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                placeholder="Masukkan kata sandi"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none transition bg-white text-gray-900"
              />
            </div>

            {/* Lupa Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-green-700 hover:text-green-800 font-medium">
                Lupa kata sandi?
              </a>
            </div>

            {/* Tombol Login */}
            <button
              type="button"
              className="w-full bg-gradient-to-r from-green-700 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-800 hover:to-green-700 transition transform hover:scale-[1.02] shadow-lg"
            >
              Masuk sebagai {loginAs === 'siswa' ? 'Siswa' : loginAs === 'guru' ? 'Guru' : 'Orang Tua'} →
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {loginAs === 'siswa' ? 'Belum punya akun? ' : 'Butuh bantuan? '}
              <a href="#" className="text-green-700 font-semibold hover:text-green-800">
                {loginAs === 'siswa' ? 'Hubungi Guru Kelas' : 'Hubungi Admin'}
              </a>
            </p>
          </div>

          {/* Info Keamanan */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Data Anda aman & terenkripsi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}