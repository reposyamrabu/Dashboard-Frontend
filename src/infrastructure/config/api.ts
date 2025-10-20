export const API_CONFIG = {
  BASE_URL: 'https://9vwmj9qw-1234.asse.devtunnels.ms',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  AVG_PASIEN: '/api/summary/avaragePasienDatas',
  RAJAL_SUM: '/api/summary/rawatJalanPasienSum',
  RANAP_SUM: '/api/summary/rawatInapPasienSum',
  RANAP_INDICATORS: '/api/summary/loadIndikatorRawatInap',
  BED_AVAILABLE: '/api/summary/loadABedAvail',
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
