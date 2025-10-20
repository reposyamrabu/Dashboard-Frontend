import { useState, useMemo } from 'react';

interface BedAvailableItem {
  nama_ruangperawatan: string;
  terpakai: string | number;
  sisa: string | number;
}

export function useBedFilter(bedAvailable?: BedAvailableItem[]) {
  const [selectedKelas, setSelectedKelas] = useState<string[]>([]);

  const kelasOptions = useMemo(() => {
    if (!bedAvailable) return [];

    const regex = /KELAS\s*\d+|VIP|HCU|ICU|NICU/i;
    const unique = new Set<string>();

    bedAvailable.forEach(item => {
      const match = item.nama_ruangperawatan.match(regex);
      unique.add(match ? match[0].toUpperCase() : 'LAINNYA');
    });

    return Array.from(unique);
  }, [bedAvailable]);

  const toggleKelas = (kelas: string) => {
    setSelectedKelas(prev =>
      prev.includes(kelas) ? prev.filter(k => k !== kelas) : [...prev, kelas]
    );
  };

  const filteredData = useMemo(() => {
    if (!bedAvailable || selectedKelas.length === 0) return bedAvailable;

    return bedAvailable.filter(item => {
      const regex = new RegExp(selectedKelas.join('|'), 'i');
      return regex.test(item.nama_ruangperawatan);
    });
  }, [selectedKelas, bedAvailable]);

  return {
    selectedKelas,
    kelasOptions,
    toggleKelas,
    filteredData,
  };
}
