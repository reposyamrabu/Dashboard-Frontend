import React from 'react';

export const LoadingChart: React.FC = () => {
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center rounded bg-white">
      <div className="text-xs text-gray-400 sm:text-sm">Loading chart...</div>
    </div>
  );
};
