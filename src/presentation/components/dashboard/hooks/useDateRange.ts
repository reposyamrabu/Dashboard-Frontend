import { useState } from 'react';

export type DateRangeType = 'Today' | '1M' | '3M' | '1Y';

function getRange(type: DateRangeType): [Date, Date] {
  const now = new Date();
  let start: Date;

  switch (type) {
    case 'Today':
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      break;
    case '1M':
      start = new Date(now);
      start.setMonth(now.getMonth() - 1);
      break;
    case '3M':
      start = new Date(now);
      start.setMonth(now.getMonth() - 3);
      break;
    case '1Y':
      start = new Date(now);
      start.setFullYear(now.getFullYear() - 1);
      break;
  }

  return [start, now];
}

export function useDateRange(defaultType: DateRangeType = 'Today') {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
    getRange(defaultType)
  );
  const [activeShortcut, setActiveShortcut] = useState<DateRangeType | null>(
    defaultType
  );

  const handleRangeShortcut = (type: DateRangeType) => {
    setDateRange(getRange(type));
    setActiveShortcut(type);
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    setActiveShortcut(null);
  };

  return {
    dateRange,
    activeShortcut,
    handleRangeShortcut,
    handleDateRangeChange,
  };
}
