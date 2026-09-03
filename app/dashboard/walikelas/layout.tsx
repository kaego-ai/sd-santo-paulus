import Sidebar from '@/app/components/Sidebar'

export default function WaliKelasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Sidebar 
        role="walikelas"
        nama="Bu Ani Susanti" 
        subNama="Wali Kelas 4B" 
      />
      <main className="p-4 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}