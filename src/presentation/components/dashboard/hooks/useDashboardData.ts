import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '@/infrastructure/services/dashboardService';
import { formatDateTime } from '../utils/dateFormatter';
import type { BorData } from '@/shared/types/dashboard';

interface UseDashboardDataProps {
  dateRange: [Date | null, Date | null];
}

export function useDashboardData({ dateRange }: UseDashboardDataProps) {
  const batasAtas = formatDateTime(dateRange[1]) || formatDateTime(new Date());
  const batasBawah = formatDateTime(dateRange[0]);

  const { data: avgPasien, isLoading: isLoadingAvgPasien } = useQuery({
    queryKey: ['avgPasien', dateRange],
    queryFn: async () => {
      const res = await DashboardService.loadAvgPasien({
        batasAtas,
        batasBawah,
      });
      return Array.isArray(res) ? res[0] : res;
    },
    staleTime: 0,
    refetchInterval: 15000,
    refetchOnWindowFocus: false,
  });

  const { data: bedAvailable, isLoading: isLoadingBed } = useQuery({
    queryKey: ['bedAvailable'],
    queryFn: async () => {
      const res = await DashboardService.loadBedAvailable();
      return res;
    },
    staleTime: 0,
    refetchInterval: 15000,
    refetchOnWindowFocus: false,
  });

  const { data: RajalSum, isLoading: isLoadingRajal } = useQuery({
    queryKey: ['rajalSum', dateRange],
    queryFn: async () => {
      const res = await DashboardService.loadRajalSum({
        batasAtas,
        batasBawah,
      });
      return res;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const {
    data: borData,
    isLoading: isLoadingBor,
    isError: isErrorBor,
  } = useQuery<BorData>({
    queryKey: ['borData', dateRange],
    queryFn: async () => {
      return DashboardService.loadBOR({ batasAtas, batasBawah });
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: rawatInapSum, isLoading: isLoadingRanap } = useQuery({
    queryKey: ['rawatInapSum', dateRange],
    queryFn: async () => {
      const res = await DashboardService.loadRanapSum({
        batasAtas,
        batasBawah,
      });
      return res;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
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
  };
}
