import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { DateRangeType } from '../hooks/useDateRange';

interface PeriodSelectorProps {
  dateRange: [Date | null, Date | null];
  activeShortcut: DateRangeType | null;
  onRangeShortcut: (type: DateRangeType) => void;
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
}

const RANGE_OPTIONS: DateRangeType[] = ['Today', '1M', '3M', '1Y'];

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  dateRange,
  activeShortcut,
  onRangeShortcut,
  onDateRangeChange,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4 lg:col-span-1">
      <h3 className="mb-2 text-xs font-semibold text-gray-800 sm:mb-3 sm:text-sm">
        Periode
      </h3>
      <div className="mb-2 flex flex-wrap gap-1.5 sm:mb-3 sm:gap-2">
        {RANGE_OPTIONS.map(label => (
          <button
            key={label}
            onClick={() => onRangeShortcut(label)}
            className={`rounded border px-2 py-0.5 text-[10px] font-medium transition-colors focus:ring-1 focus:ring-green-200 focus:outline-none sm:px-2.5 sm:py-1 sm:text-xs ${
              activeShortcut === label
                ? 'border-green-600 bg-green-600 text-white hover:bg-green-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700'
            }`}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <DatePicker
        selected={dateRange[0]}
        onChange={onDateRangeChange}
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        dateFormat="dd MMM yyyy"
        placeholderText="Pilih rentang tanggal"
        className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-700 transition-colors hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
        calendarClassName="!font-sans"
        dayClassName={() => 'hover:bg-green-100 focus:bg-green-200 text-sm'}
        monthClassName={() => 'hover:bg-green-100'}
        yearClassName={() => 'hover:bg-green-100'}
      />
    </div>
  );
};
