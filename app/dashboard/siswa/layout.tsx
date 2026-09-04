import Sidebar from '@/app/components/Sidebar'
import AuthGuard from '@/app/components/AuthGuard'

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['siswa']}>
      <div className="min-h-screen bg-[#F7F5F0]">
        <Sidebar 
          role="siswa"
          nama="Andi Wijaya" 
          subNama="Kelas 4B" 
        />
        <main className="p-4 lg:p-8 lg:ml-20 transition-all duration-300">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}