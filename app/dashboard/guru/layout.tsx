import Sidebar from '@/app/components/Sidebar'

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Sidebar 
        role="guru" 
        nama="Bu Sari Wijaya" 
        subNama="Guru IPAS" 
      />
      <main className="p-4 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}