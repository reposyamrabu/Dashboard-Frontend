import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useDateRange } from './hooks/useDateRange';
import { useDashboardData } from './hooks/useDashboardData';
import { useBedFilter } from './hooks/useBedFilter';
import { getIndicators } from './config/indicators';
import { PeriodSelector } from './components/PeriodSelector';
import { KPICard } from './components/KPICard';
import { RawatJalanChart } from './components/RawatJalanChart';
import { RawatInapChart } from './components/RawatInapChart';
import { IndicatorsSection } from './components/IndicatorsSection';
import { BedAvailabilityChart } from './components/BedAvailabilityChart';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const KominfoDashboard: React.FC = () => {
  // Custom hooks for state management
  const {
    dateRange,
    activeShortcut,
    handleRangeShortcut,
    handleDateRangeChange,
  } = useDateRange('Today');

  const {
    avgPasien,
    isLoadingAvgPasien,
    bedAvailable,
    isLoadingBed,
    RajalSum,
    isLoadingRajal,
    borData,
    isLoadingBor,
    isErrorBor,
    rawatInapSum,
    isLoadingRanap,
  } = useDashboardData({ dateRange });

  const { selectedKelas, kelasOptions, toggleKelas, filteredData } =
    useBedFilter(bedAvailable);

  // Derive data from queries
  const indicators = getIndicators(borData);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* KPI Cards Section */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <PeriodSelector
          dateRange={dateRange}
          activeShortcut={activeShortcut}
          onRangeShortcut={handleRangeShortcut}
          onDateRangeChange={handleDateRangeChange}
        />

        <KPICard
          title="Kunjungan Rawat Jalan"
          value={avgPasien?.jml_rwj || 0}
          isLoading={isLoadingAvgPasien}
        />

        <KPICard
          title="Kunjungan IGD"
          value={avgPasien?.jml_ird || 0}
          isLoading={isLoadingAvgPasien}
        />

        <KPICard
          title="Kunjungan Rawat Inap"
          value={avgPasien?.jml_rwi || 0}
          isLoading={isLoadingAvgPasien}
        />
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <RawatJalanChart data={RajalSum} isLoading={isLoadingRajal} />

        <RawatInapChart data={rawatInapSum} isLoading={isLoadingRanap} />

        <IndicatorsSection
          indicators={indicators}
          isLoading={isLoadingBor}
          isError={isErrorBor}
        />

        <BedAvailabilityChart
          data={filteredData}
          isLoading={isLoadingBed}
          kelasOptions={kelasOptions}
          selectedKelas={selectedKelas}
          onToggleKelas={toggleKelas}
        />
      </div>
    </div>
  );
};

export default KominfoDashboard;
