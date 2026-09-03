'use client'

export default function DashboardSiswa() {
  return (
    <div>
      {/* Banner Selamat Datang */}
      <div className="bg-gradient-to-r from-[#5B8C5A] to-[#4A7349] rounded-2xl p-6 mb-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang, Andi! 👋</h2>
        <p className="text-white/90 mb-4">Sudah belajar 5 hari berturut-turut. Luar biasa!</p>
        
        <div className="bg-white/20 rounded-xl p-4 max-w-md">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Level 12 - Penjelajah Hebat</span>
            <span className="text-sm">450/600 XP</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* Progress Mata Pelajaran */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6 mb-6">
        <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">📊 Progress Mata Pelajaran</h3>
        <div className="space-y-4">
          {[
            { nama: 'Matematika', progress: 85, warna: 'bg-red-500' },
            { nama: 'Bahasa Indonesia', progress: 72, warna: 'bg-green-500' },
            { nama: 'IPAS', progress: 90, warna: 'bg-blue-500' },
            { nama: 'Bahasa Inggris', progress: 68, warna: 'bg-purple-500' },
            { nama: 'Agama Katolik', progress: 95, warna: 'bg-yellow-500' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#3D3D3D]">{item.nama}</span>
                <span className="font-bold text-[#3D3D3D]">{item.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div className={`${item.warna} h-3 rounded-full`} style={{ width: `${item.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pencapaian & Jadwal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <h3 className="text-xl font-bold text-[#3D3D3D] mb-4"> Pencapaian</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🥇', label: 'Penjelajah Cerdas' },
              { icon: '📚', label: 'Pembaca Ulung' },
              { icon: '🧮', label: 'Ahli Hitung' },
              { icon: '⭐', label: 'Rajin Sekali' },
            ].map((badge, i) => (
              <div key={i} className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-3 text-center">
                <div className="text-3xl mb-1">{badge.icon}</div>
                <p className="text-xs font-semibold">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DD] p-6">
          <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">📅 Jadwal Hari Ini</h3>
          <div className="space-y-3">
            {[
              { waktu: '08:00-09:30', mapel: 'Matematika', guru: 'Bu Sari' },
              { waktu: '09:45-11:15', mapel: 'IPAS', guru: 'Pak Toni' },
              { waktu: '13:00-14:30', mapel: 'Bahasa Indonesia', guru: 'Bu Ani' },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-[#5B8C5A] pl-3">
                <p className="text-xs text-[#7A7A7A]">{item.waktu}</p>
                <p className="font-semibold text-[#3D3D3D]">{item.mapel}</p>
                <p className="text-sm text-[#7A7A7A]">{item.guru}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}