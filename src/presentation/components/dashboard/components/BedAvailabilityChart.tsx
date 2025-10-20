import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartCard } from './ChartCard';
import { LoadingChart } from './LoadingChart';
import { barChartOptions } from '../config/chartOptions';

interface BedAvailableItem {
  nama_ruangperawatan: string;
  terpakai: string | number;
  sisa: string | number;
}

interface BedAvailabilityChartProps {
  data?: BedAvailableItem[];
  isLoading: boolean;
  kelasOptions: string[];
  selectedKelas: string[];
  onToggleKelas: (kelas: string) => void;
}

export const BedAvailabilityChart: React.FC<BedAvailabilityChartProps> = ({
  data,
  isLoading,
  kelasOptions,
  selectedKelas,
  onToggleKelas,
}) => {
  const chartData = useMemo(() => {
    if (!data) return { labels: [], datasets: [] };

    return {
      labels: data.map(item => item.nama_ruangperawatan),
      datasets: [
        {
          label: 'Terisi',
          data: data.map(item => Number(item.terpakai)),
          backgroundColor: '#16a34a',
          borderRadius: 2,
        },
        {
          label: 'Tersedia',
          data: data.map(item => Number(item.sisa)),
          backgroundColor: '#86efac',
          borderRadius: 2,
        },
      ],
    };
  }, [data]);

  const allKelasSelected = selectedKelas.length === 0;

  return (
    <ChartCard title="Ketersediaan BED" className="lg:col-span-2">
      <div className="mb-4 flex flex-wrap gap-3">
        {kelasOptions.map(kelas => (
          <label
            key={kelas}
            className="flex items-center space-x-1 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={selectedKelas.includes(kelas)}
              onChange={() => onToggleKelas(kelas)}
              className="accent-green-600"
            />
            <span>{kelas}</span>
          </label>
        ))}
      </div>
      <div className={`w-full ${allKelasSelected ? 'h-[50rem]' : 'h-[20rem]'}`}>
        {isLoading ? (
          <LoadingChart />
        ) : (
          <Bar data={chartData} options={barChartOptions} />
        )}
      </div>
    </ChartCard>
  );
};
