import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartCard } from './ChartCard';
import { LoadingChart } from './LoadingChart';
import { lineChartOptions } from '../config/chartOptions';

interface RawatInapItem {
  name: string;
  total: number;
}

interface RawatInapChartProps {
  data?: RawatInapItem[];
  isLoading: boolean;
}

export const RawatInapChart: React.FC<RawatInapChartProps> = ({
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
      labels: data.map(item => item.name),
      datasets: [
        {
          label: 'Kunjungan Rawat Inap',
          data: data.map(item => item.total),
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
    <ChartCard title="Kunjungan Rawat Inap">
      <div className="relative h-64 sm:h-72 md:h-80">
        {isLoading ? (
          <LoadingChart />
        ) : (
          <Line data={chartData} options={lineChartOptions} />
        )}
      </div>
    </ChartCard>
  );
};
