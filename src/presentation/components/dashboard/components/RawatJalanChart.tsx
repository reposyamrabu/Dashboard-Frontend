import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartCard } from './ChartCard';
import { LoadingChart } from './LoadingChart';
import { lineChartOptions } from '../config/chartOptions';

interface RawatJalanItem {
  nama_unit: string;
  jml_current: string | number;
}

interface RawatJalanChartProps {
  data?: RawatJalanItem[];
  isLoading: boolean;
}

export const RawatJalanChart: React.FC<RawatJalanChartProps> = ({
  data,
  isLoading,
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: data.map(item => item.nama_unit),
      datasets: [
        {
          label: 'Kunjungan Rawat Jalan',
          data: data.map(item => Number(item.jml_current)),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#10b981',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: false,
        },
      ],
    };
  }, [data]);

  return (
    <ChartCard title="Kunjungan Rawat Jalan" className="lg:col-span-2">
      <div className="relative h-64 sm:h-80 md:h-96">
        {isLoading ? (
          <LoadingChart />
        ) : (
          <Line data={chartData} options={lineChartOptions} />
        )}
      </div>
    </ChartCard>
  );
};
