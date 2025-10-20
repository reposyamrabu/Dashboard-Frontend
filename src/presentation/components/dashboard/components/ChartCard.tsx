import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg bg-[#e7f1f0] p-3 shadow-sm sm:p-4 ${className}`}
    >
      <h3 className="mb-2 text-sm font-semibold text-gray-800 sm:mb-3 sm:text-base">
        {title}
      </h3>
      {children}
    </div>
  );
};
