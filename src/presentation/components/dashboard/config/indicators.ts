import type { BorData } from '@/shared/types/dashboard';
import { safeParseFloat } from '../utils/chartHelpers';

export interface Indicator {
  label: string;
  value: number;
  unit: string;
  maxScale: number;
  ideal: { min: number; max: number };
}

export function getIndicators(borData?: BorData): Indicator[] {
  return [
    {
      label: 'BOR',
      value: safeParseFloat(borData?.BOR?.[0]?.bor),
      unit: '%',
      maxScale: 100,
      ideal: { min: 60, max: 85 },
    },
    {
      label: 'Av LOS',
      value: safeParseFloat(borData?.LOS?.[0]?.alos),
      unit: ' hari',
      maxScale: 100,
      ideal: { min: 6, max: 9 },
    },
    {
      label: 'BTO',
      value: safeParseFloat(borData?.BTO?.[0]?.bto),
      unit: ' kali',
      maxScale: 100,
      ideal: { min: 4, max: 50 },
    },
    {
      label: 'TOI',
      value: safeParseFloat(borData?.TOI?.[0]?.toi),
      unit: ' hari',
      maxScale: 100,
      ideal: { min: 1, max: 3 },
    },
    {
      label: 'NDR',
      value: safeParseFloat(borData?.NDR?.[0]?.hasil),
      unit: ' ‰',
      maxScale: 100,
      ideal: { min: 0, max: 25 },
    },
    {
      label: 'GDR',
      value: safeParseFloat(borData?.GDR?.[0]?.hasil),
      unit: ' ‰',
      maxScale: 100,
      ideal: { min: 0, max: 45 },
    },
  ];
}
