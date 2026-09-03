import Sidebar from '@/app/components/Sidebar'
import AuthGuard from '@/app/components/AuthGuard'

export default function OrtuLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['ortu']}>
      <div className="min-h-screen bg-[#F7F5F0]">
        <Sidebar 
          role="ortu"
          nama="Bapak Wijaya" 
          subNama="Orang Tua Andi" 
        />
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}