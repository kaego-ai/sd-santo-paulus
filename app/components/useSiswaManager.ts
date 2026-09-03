'use client'
import { useState, useEffect } from 'react'

export interface Siswa {
  id: number
  nis: string
  nama: string
  kelas: string
  jenisKelamin: 'L' | 'P'
  tempatLahir: string
  tanggalLahir: string
  namaAyah: string
  namaIbu: string
  noHpOrtu: string
  alamat: string
  agama: string
}

const STORAGE_KEY = 'sd_santo_paulus_siswa_data'

const defaultSiswa: Siswa[] = [
  { id: 1, nis: '2024001', nama: 'Andi Wijaya', kelas: '4B', jenisKelamin: 'L', tempatLahir: 'Jakarta', tanggalLahir: '2016-05-12', namaAyah: 'Bapak Wijaya', namaIbu: 'Ibu Wijaya', noHpOrtu: '081234567890', alamat: 'Jl. Merdeka No. 1', agama: 'Katolik' },
  { id: 2, nis: '2024002', nama: 'Budi Santoso', kelas: '4B', jenisKelamin: 'L', tempatLahir: 'Bandung', tanggalLahir: '2016-07-20', namaAyah: 'Bapak Santoso', namaIbu: 'Ibu Santoso', noHpOrtu: '081234567891', alamat: 'Jl. Sudirman No. 5', agama: 'Katolik' },
  { id: 3, nis: '2024003', nama: 'Citra Lestari', kelas: '4B', jenisKelamin: 'P', tempatLahir: 'Surabaya', tanggalLahir: '2016-03-15', namaAyah: 'Bapak Lestari', namaIbu: 'Ibu Lestari', noHpOrtu: '081234567892', alamat: 'Jl. Gatot Subroto No. 10', agama: 'Katolik' },
  { id: 4, nis: '2024004', nama: 'Dewi Kusuma', kelas: '4B', jenisKelamin: 'P', tempatLahir: 'Yogyakarta', tanggalLahir: '2016-09-08', namaAyah: 'Bapak Kusuma', namaIbu: 'Ibu Kusuma', noHpOrtu: '081234567893', alamat: 'Jl. Malioboro No. 3', agama: 'Katolik' },
  { id: 5, nis: '2024005', nama: 'Eko Prasetyo', kelas: '4B', jenisKelamin: 'L', tempatLahir: 'Semarang', tanggalLahir: '2016-11-25', namaAyah: 'Bapak Prasetyo', namaIbu: 'Ibu Prasetyo', noHpOrtu: '081234567894', alamat: 'Jl. Pemuda No. 7', agama: 'Katolik' },
]

export function useSiswaManager() {
  const [siswaList, setSiswaList] = useState<Siswa[]>(defaultSiswa)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const hasData = parsed.some((s: any) => s.nis)
        if (!hasData) {
          localStorage.removeItem(STORAGE_KEY)
          setSiswaList(defaultSiswa)
        } else {
          setSiswaList(parsed)
        }
      } catch (e) {
        console.error('Error parsing siswa data:', e)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siswaList))
    }
  }, [siswaList, isLoading])

  const tambahSiswa = (siswa: Omit<Siswa, 'id'>) => {
    const newSiswa: Siswa = {
      ...siswa,
      id: siswaList.length > 0 ? Math.max(...siswaList.map(s => s.id)) + 1 : 1,
    }
    setSiswaList([...siswaList, newSiswa])
  }

  const editSiswa = (id: number, data: Partial<Siswa>) => {
    setSiswaList(siswaList.map(s => s.id === id ? { ...s, ...data } : s))
  }

  const hapusSiswa = (id: number) => {
    setSiswaList(siswaList.filter(s => s.id !== id))
  }

  const importDariCSV = (csvText: string) => {
    const lines = csvText.trim().split('\n')
    if (lines.length < 2) {
      alert('File CSV tidak valid!')
      return
    }

    const newSiswaList: Siswa[] = [...siswaList]
    let importedCount = 0

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',')
      if (cols.length >= 4) {
        newSiswaList.push({
          id: newSiswaList.length > 0 ? Math.max(...newSiswaList.map(s => s.id)) + 1 : 1,
          nis: cols[0]?.trim() || '',
          nama: cols[1]?.trim() || '',
          kelas: cols[2]?.trim() || '',
          jenisKelamin: (cols[3]?.trim().toUpperCase() as 'L' | 'P') || 'L',
          tempatLahir: cols[4]?.trim() || '',
          tanggalLahir: cols[5]?.trim() || '',
          namaAyah: cols[6]?.trim() || '',
          namaIbu: cols[7]?.trim() || '',
          noHpOrtu: cols[8]?.trim() || '',
          alamat: cols[9]?.trim() || '',
          agama: cols[10]?.trim() || 'Katolik',
        })
        importedCount++
      }
    }

    setSiswaList(newSiswaList)
    alert(`✅ Berhasil mengimport ${importedCount} siswa!`)
  }

  const exportKeCSV = () => {
    const headers = 'NIS,Nama,Kelas,JenisKelamin,TempatLahir,TanggalLahir,NamaAyah,NamaIbu,NoHpOrtu,Alamat,Agama'
    const rows = siswaList.map(s => 
      `${s.nis},${s.nama},${s.kelas},${s.jenisKelamin},${s.tempatLahir},${s.tanggalLahir},${s.namaAyah},${s.namaIbu},${s.noHpOrtu},${s.alamat},${s.agama}`
    ).join('\n')
    
    const csvContent = headers + '\n' + rows
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data_siswa_sd_santo_paulus.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetSiswa = () => {
    if (confirm('Yakin ingin reset ke data default?')) {
      setSiswaList(defaultSiswa)
    }
  }

  return {
    siswaList,
    isLoading,
    tambahSiswa,
    editSiswa,
    hapusSiswa,
    importDariCSV,
    exportKeCSV,
    resetSiswa,
  }
}