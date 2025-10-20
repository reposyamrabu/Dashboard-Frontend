import React from 'react';
import { ChartCard } from './ChartCard';
import { IndicatorCard } from './IndicatorCard';
import type { Indicator } from '../config/indicators';

interface IndicatorsSectionProps {
  indicators: Indicator[];
  isLoading: boolean;
  isError: boolean;
}

const IndicatorSkeleton: React.FC = () => (
  <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:p-3">
    <div className="mb-2 flex items-center justify-between">
      <div className="h-3 w-12 rounded bg-gray-200 sm:h-4 sm:w-16"></div>
      <div className="h-4 w-16 rounded bg-gray-200 sm:h-5 sm:w-20"></div>
    </div>
    <div className="h-2 w-full rounded-full bg-gray-200"></div>
    <div className="mt-1 h-2 w-20 rounded bg-gray-200 sm:h-3 sm:w-24"></div>
  </div>
);

export const IndicatorsSection: React.FC<IndicatorsSectionProps> = ({
  indicators,
  isLoading,
  isError,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3"
        >
          {Array.from({ length: 2 }).map((_, colIndex) => (
            <IndicatorSkeleton key={colIndex} />
          ))}
        </div>
      ));
    }

    if (isError) {
      return (
        <div className="py-6 text-center text-sm text-red-500 sm:py-8 sm:text-base">
          Gagal memuat data
        </div>
      );
    }

    return indicators
      .reduce<Indicator[][]>((rows, indicator, index) => {
        if (index % 2 === 0) rows.push([indicator]);
        else rows[rows.length - 1].push(indicator);
        return rows;
      }, [])
      .map((row, i) => (
        <div key={i} className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          {row.map(indicator => (
            <IndicatorCard key={indicator.label} indicator={indicator} />
          ))}
        </div>
      ));
  };

  return (
    <ChartCard title="Indikator Rawat Inap">
      <div className="space-y-2 sm:space-y-3">{renderContent()}</div>
    </ChartCard>
  );
};
