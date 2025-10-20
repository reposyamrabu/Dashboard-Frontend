import React from 'react';

interface KPICardProps {
  title: string;
  value: number | string;
  isLoading: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  isLoading,
}) => {
  return (
    <div className="rounded-lg border-2 border-green-600 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-1 text-[10px] font-medium tracking-wide text-gray-600 uppercase sm:mb-2 sm:text-xs">
        {title}
      </div>
      {isLoading ? (
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200 sm:h-8 sm:w-24"></div>
      ) : (
        <div className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      )}
    </div>
  );
};
