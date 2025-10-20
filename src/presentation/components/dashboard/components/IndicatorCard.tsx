import React from 'react';
import type { Indicator } from '../config/indicators';
import { getProgressPercentage } from '../utils/chartHelpers';

interface IndicatorCardProps {
  indicator: Indicator;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator }) => {
  const { label, value, unit, maxScale, ideal } = indicator;
  const progressPercentage = getProgressPercentage(value, maxScale);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:p-3">
      <div className="mb-1 flex items-center justify-between sm:mb-2">
        <span className="text-[10px] font-semibold text-gray-700 sm:text-xs">
          {label}
        </span>
        <span className="text-xs font-bold text-gray-900 sm:text-sm">
          {value.toFixed(2)}
          {unit}
        </span>
      </div>
      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-green-200 sm:h-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-700 to-green-800 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {ideal && (
        <div className="text-[9px] text-gray-500 sm:text-[10px]">
          Ideal: {ideal.min}-{ideal.max}
          {unit} {label === 'BTO' ? 'per Tahun' : ''}
        </div>
      )}
    </div>
  );
};
