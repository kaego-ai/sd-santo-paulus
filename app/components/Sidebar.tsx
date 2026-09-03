'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Bab } from './useBabManager'

// Interface untuk menu item
interface SubMenuItem {
  label: string
  href: string
  mapel?: string
}

interface MenuItem {
  label: string
  icon: string
  href: string
  hasSubmenu?: boolean
  submenu?: SubMenuItem[]
}

interface SidebarProps {
  role: 'guru' | 'siswa' | 'ortu' | 'walikelas' | 'admin'
  nama: string
  subNama: string
}

export default function Sidebar({ role, nama, subNama }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null)
  const [babList, setBabList] = useState<Bab[]>([])
  const pathname = usePathname()

  // Load bab dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sd_santo_paulus_bab_data')
    if (saved) {
      try {
        setBabList(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Menu untuk Guru
  const menuGuru: MenuItem[] = [
    { label: 'Dashboard', icon: '🏠', href: '/dashboard/guru' },
    { 
      label: 'Materi & Bab', 
      icon: '📚', 
      href: '/dashboard/guru/materi',
      hasSubmenu: true,
      submenu: babList.map(bab => ({
        label: `Bab ${bab.id}: ${bab.judul}`,
        href: `/materi/${bab.id}`,
      }))
    },
    { label: 'Buat Kuis', icon: '📝', href: '/kuis' },
    { label: 'Nilai Siswa', icon: '📊', href: '#' },
    { label: 'Pengumuman', icon: '📢', href: '#' },
  ]

  // Menu untuk Siswa
  const menuSiswa: MenuItem[] = [
    { label: 'Dashboard', icon: '🏠', href: '/dashboard/siswa' },
    { 
      label: 'Materi Saya', 
      icon: '📚', 
      href: '/materi/1',
      hasSubmenu: true,
      submenu: babList
        .filter(bab => bab.status === 'published')
        .map(bab => ({
          label: `Bab ${bab.id}: ${bab.judul}`,
          href: `/materi/${bab.id}`,
        }))
    },
    { label: 'Kuis Interaktif', icon: '', href: '/kuis' },
    { label: 'Nilai Saya', icon: '', href: '#' },
    { label: 'Pencapaian', icon: '🏆', href: '#' },
  ]

  // Menu untuk Orang Tua
  const menuOrtu: MenuItem[] = [
    { label: 'Dashboard', icon: '🏠', href: '/dashboard/ortu' },
    { label: 'Nilai Anak', icon: '📊', href: '#' },
    { label: 'Pesan Guru', icon: '💬', href: '#' },
    { label: 'Jadwal', icon: '📅', href: '#' },
    { label: 'Laporan', icon: '📄', href: '#' },
  ]

  // Menu untuk Wali Kelas
  const menuWaliKelas: MenuItem[] = [
    { label: 'Dashboard', icon: '', href: '/dashboard/walikelas' },
    { 
      label: 'Materi Semua Mapel', 
      icon: '📚', 
      href: '/dashboard/walikelas/materi',
      hasSubmenu: true,
      submenu: babList
        .filter(bab => bab.status === 'published')
        .map(bab => ({
          label: `Bab ${bab.id}: ${bab.judul}`,
          href: `/materi/${bab.id}`,
          mapel: bab.mapel
        }))
    },
    { label: 'Nilai Siswa', icon: '', href: '#' },
    { label: 'Pesan Orang Tua', icon: '💬', href: '#' },
    { label: 'Laporan', icon: '📄', href: '#' },
  ]

  // Menu untuk Admin
  const menuAdmin: MenuItem[] = [
    { label: 'Dashboard Admin', icon: '🏠', href: '/admin' },
    { label: 'Kelola Guru', icon: '👨‍', href: '/admin/guru' },
    { label: 'Kelola Siswa', icon: '', href: '/admin/siswa' },
    { label: 'Kelola Kelas', icon: '🏫', href: '/admin/kelas' },
    { label: 'Pengaturan', icon: '⚙️', href: '/admin/pengaturan' },
  ]

  const menu = role === 'admin' ? menuAdmin
    : role === 'guru' ? menuGuru
    : role === 'siswa' ? menuSiswa
    : role === 'walikelas' ? menuWaliKelas
    : menuOrtu

  const isActive = (href: string) => pathname === href

  const toggleSubmenu = (index: number) => {
    setExpandedMenu(expandedMenu === index ? null : index)
  }

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      localStorage.removeItem('sd_santo_paulus_auth')
      window.location.href = '/login'
    }
  }

  return (
    <>
      {/* Tombol Mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#5B8C5A] text-white rounded-xl shadow-lg hover:bg-[#4A7349] transition"
      >
        <span className="text-xl">☰</span>
      </button>

      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-[#E8E4DD] z-40
        transition-all duration-300 ease-in-out shadow-lg
        ${collapsed ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-[#E8E4DD] bg-gradient-to-r from-[#5B8C5A] to-[#4A7349]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-[#D4B896] flex-shrink-0 shadow-md">
              <span className="text-[#5B8C5A] font-bold text-lg">SP</span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="font-bold text-white text-sm truncate">
                  Panel {role === 'guru' ? 'Guru' : role === 'siswa' ? 'Siswa' : role === 'admin' ? 'Admin' : role === 'walikelas' ? 'Wali Kelas' : 'Ortu'}
                </p>
                <p className="text-xs text-white/80 truncate">{subNama}</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-220px)]">
          {menu.map((item, index) => (
            <div key={index}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                      isActive(item.href) || expandedMenu === index
                        ? 'bg-[#5B8C5A] text-white'
                        : 'text-[#3D3D3D] hover:bg-[#F0EDE6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <span className="text-xs">
                        {expandedMenu === index ? '▼' : '▶'}
                      </span>
                    )}
                  </button>
                  
                  {!collapsed && expandedMenu === index && item.submenu && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu.length === 0 ? (
                        <p className="px-3 py-2 text-xs text-[#7A7A7A] italic">
                          Belum ada bab
                        </p>
                      ) : (
                        item.submenu.map((sub: SubMenuItem, subIndex: number) => {
                          const prevSub = subIndex > 0 ? item.submenu![subIndex - 1] : null;
                          const showMapelHeader = !prevSub || prevSub.mapel !== sub.mapel;

                          return (
                            <div key={subIndex}>
                              {showMapelHeader && sub.mapel && (
                                <div className="px-3 py-1 mt-2 first:mt-0 text-[10px] font-bold text-[#6B9BB8] uppercase tracking-wider">
                                  {sub.mapel}
                                </div>
                              )}
                              <a
                                href={sub.href}
                                className={`block px-3 py-1.5 rounded-lg text-xs transition ${
                                  isActive(sub.href)
                                    ? 'bg-[#B8D4B8] text-[#3D5A3D] font-semibold'
                                    : 'text-[#7A7A7A] hover:bg-[#F0EDE6] hover:text-[#5B8C5A]'
                                }`}
                              >
                                {sub.label}
                              </a>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                    isActive(item.href)
                      ? 'bg-[#5B8C5A] text-white shadow-md'
                      : 'text-[#3D3D3D] hover:bg-[#F0EDE6]'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Footer dengan Tombol Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#E8E4DD] bg-[#F7F5F0]">
          {!collapsed && (
            <div className="mb-2 p-2 bg-white rounded-lg border border-[#E8E4DD]">
              <p className="text-xs font-semibold text-[#3D3D3D] truncate">{nama}</p>
              <p className="text-xs text-[#7A7A7A] truncate">{subNama}</p>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex flex-1 items-center justify-center gap-2 px-3 py-2 bg-[#F0EDE6] rounded-xl hover:bg-[#E8E4DD] transition text-[#3D3D3D] font-semibold text-sm"
            >
              {collapsed ? '→' : '←'}
              {!collapsed && 'Ciutkan'}
            </button>
            
            <button
              onClick={handleLogout}
              className={`flex-1 px-3 py-2 bg-[#C97B7B] text-white rounded-xl hover:bg-[#B86A6A] transition font-semibold text-sm flex items-center justify-center gap-2`}
            >
              {collapsed ? '🚪' : '🚪 Logout'}
            </button>
          </div>  
        </div>
      </aside>

      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`} />
    </>
  )
}