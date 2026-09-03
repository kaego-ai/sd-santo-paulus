'use client'
import { useState, useEffect } from 'react'

export interface Guru {
  id: number
  nama: string
  nip: string
  role: 'guru' | 'walikelas'
  mapel?: string  // Untuk guru mapel
  kelas?: string  // Untuk wali kelas
  email: string
  password: string
}

const STORAGE_KEY = 'sd_santo_paulus_guru_data'

// Data default
const defaultGuru: Guru[] = [
  { id: 1, nama: 'Bu Sari Wijaya', nip: '198803152011012001', role: 'guru', mapel: 'IPAS', email: 'sari@sdsp.sch.id', password: '123456' },
  { id: 2, nama: 'Bu Ani Susanti', nip: '198803152011012002', role: 'walikelas', kelas: '4B', email: 'ani@sdsp.sch.id', password: '123456' },
  { id: 3, nama: 'Pak Budi Santoso', nip: '198803152011012003', role: 'guru', mapel: 'Matematika', email: 'budi@sdsp.sch.id', password: '123456' },
]

export function useGuruManager() {
  const [guruList, setGuruList] = useState<Guru[]>(defaultGuru)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setGuruList(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing guru data:', e)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guruList))
    }
  }, [guruList, isLoading])

  const tambahGuru = (guru: Omit<Guru, 'id'>) => {
    const newGuru: Guru = {
      ...guru,
      id: guruList.length > 0 ? Math.max(...guruList.map(g => g.id)) + 1 : 1,
    }
    setGuruList([...guruList, newGuru])
  }

  const editGuru = (id: number, data: Partial<Guru>) => {
    setGuruList(guruList.map(g => g.id === id ? { ...g, ...data } : g))
  }

  const hapusGuru = (id: number) => {
    setGuruList(guruList.filter(g => g.id !== id))
  }

  const resetGuru = () => {
    if (confirm('Yakin ingin reset ke data default?')) {
      setGuruList(defaultGuru)
    }
  }

  return {
    guruList,
    isLoading,
    tambahGuru,
    editGuru,
    hapusGuru,
    resetGuru,
  }
}