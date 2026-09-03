'use client'
import { useState, useEffect } from 'react'

export interface Bab {
  id: number
  judul: string
  mapel: string
  status: 'published' | 'draft'
  updated: string
  konten?: string
}

const STORAGE_KEY = 'sd_santo_paulus_bab_data'

// Data default dengan SEMUA MATA PELAJARAN
const defaultBab: Bab[] = [
  // IPAS
  { id: 1, judul: 'Pendahuluan', mapel: 'IPAS', status: 'published', updated: '1 Sep 2026' },
  { id: 2, judul: 'Organ Pernapasan Manusia', mapel: 'IPAS', status: 'published', updated: '1 Sep 2026' },
  { id: 3, judul: 'Proses Pernapasan', mapel: 'IPAS', status: 'draft', updated: '-' },
  { id: 4, judul: 'Pernapasan pada Hewan', mapel: 'IPAS', status: 'draft', updated: '-' },
  { id: 5, judul: 'Gangguan Sistem Pernapasan', mapel: 'IPAS', status: 'draft', updated: '-' },
  
  // Matematika
  { id: 6, judul: 'Bilangan Pecahan', mapel: 'Matematika', status: 'published', updated: '1 Sep 2026' },
  { id: 7, judul: 'Operasi Hitung Pecahan', mapel: 'Matematika', status: 'published', updated: '1 Sep 2026' },
  { id: 8, judul: 'Pecahan Senilai', mapel: 'Matematika', status: 'draft', updated: '-' },
  
  // Bahasa Indonesia
  { id: 9, judul: 'Cerita Pendek', mapel: 'Bahasa Indonesia', status: 'published', updated: '1 Sep 2026' },
  { id: 10, judul: 'Puisi Anak', mapel: 'Bahasa Indonesia', status: 'published', updated: '1 Sep 2026' },
  { id: 11, judul: 'Menulis Karangan', mapel: 'Bahasa Indonesia', status: 'draft', updated: '-' },
  
  // Bahasa Inggris
  { id: 12, judul: 'My Family', mapel: 'Bahasa Inggris', status: 'published', updated: '1 Sep 2026' },
  { id: 13, judul: 'My School', mapel: 'Bahasa Inggris', status: 'draft', updated: '-' },
  { id: 14, judul: 'Daily Activities', mapel: 'Bahasa Inggris', status: 'draft', updated: '-' },
  
  // Agama Katolik
  { id: 15, judul: 'Mengasihi Sesama', mapel: 'Agama Katolik', status: 'published', updated: '1 Sep 2026' },
  { id: 16, judul: 'Doa Harian', mapel: 'Agama Katolik', status: 'published', updated: '1 Sep 2026' },
  
  // PJOK
  { id: 17, judul: 'Gerak Dasar Lokomotor', mapel: 'PJOK', status: 'published', updated: '1 Sep 2026' },
  { id: 18, judul: 'Permainan Bola Kecil', mapel: 'PJOK', status: 'draft', updated: '-' },
]

export function useBabManager() {
  const [babList, setBabList] = useState<Bab[]>(defaultBab)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setBabList(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing bab data:', e)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(babList))
    }
  }, [babList, isLoading])

  const tambahBab = (judul: string, mapel: string) => {
    const newBab: Bab = {
      id: babList.length > 0 ? Math.max(...babList.map(b => b.id)) + 1 : 1,
      judul,
      mapel,
      status: 'draft',
      updated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setBabList([...babList, newBab])
  }

  const editBab = (id: number, judulBaru: string) => {
    setBabList(babList.map(bab => 
      bab.id === id 
        ? { 
            ...bab, 
            judul: judulBaru,
            updated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
          } 
        : bab
    ))
  }

  const hapusBab = (id: number) => {
    setBabList(babList.filter(bab => bab.id !== id))
  }

  const togglePublish = (id: number) => {
    setBabList(babList.map(bab => 
      bab.id === id 
        ? { 
            ...bab, 
            status: bab.status === 'published' ? 'draft' : 'published',
            updated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
          } 
        : bab
    ))
  }

  const pindahkanBab = (index: number, arah: 'up' | 'down') => {
    if (arah === 'up' && index === 0) return
    if (arah === 'down' && index === babList.length - 1) return
    
    const newList = [...babList]
    const newIndex = arah === 'up' ? index - 1 : index + 1
    ;[newList[index], newList[newIndex]] = [newList[newIndex], newList[index]]
    setBabList(newList)
  }

  const resetBab = () => {
    if (confirm('Yakin ingin reset ke data default? Semua perubahan akan hilang.')) {
      setBabList(defaultBab)
    }
  }

  return {
    babList,
    isLoading,
    tambahBab,
    editBab,
    hapusBab,
    togglePublish,
    pindahkanBab,
    resetBab,
  }
}