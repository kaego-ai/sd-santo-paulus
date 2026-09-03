import Sidebar from '@/app/components/Sidebar'
import AuthGuard from '@/app/components/AuthGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="min-h-screen bg-[#F7F5F0]">
        <Sidebar 
          role="admin"
          nama="Administrator" 
          subNama="SD Santo Paulus" 
        />
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}