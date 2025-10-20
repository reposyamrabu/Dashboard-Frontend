import type {
  BedAvailableProps,
  BorData,
  DashboardAvgPasienProps,
  DashboardRawatInapSumProps,
  DashboardRawatJalanSumProps,
} from '@/shared/types/dashboard';
import { ApiService } from '../api';
import { API_ENDPOINTS } from '../config/api';

export class DashboardService {
  static async loadAvgPasien(params: {
    batasBawah: string;
    batasAtas: string;
  }): Promise<DashboardAvgPasienProps[]> {
    try {
      const response = await ApiService.get<DashboardAvgPasienProps[]>(
        API_ENDPOINTS.AVG_PASIEN,
        { params }
      );

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async loadRanapSum(params: {
    batasBawah: string;
    batasAtas: string;
  }): Promise<DashboardRawatInapSumProps[]> {
    try {
      const response = await ApiService.get<DashboardRawatInapSumProps[]>(
        API_ENDPOINTS.RANAP_SUM,
        { params }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async loadBedAvailable(): Promise<BedAvailableProps[]> {
    try {
      const response = await ApiService.get<BedAvailableProps[]>(
        API_ENDPOINTS.BED_AVAILABLE
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async loadRajalSum(params: {
    batasBawah: string;
    batasAtas: string;
  }): Promise<DashboardRawatJalanSumProps[]> {
    try {
      const response = await ApiService.get<DashboardRawatJalanSumProps[]>(
        API_ENDPOINTS.RAJAL_SUM,
        { params }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async loadBOR(params: {
    batasBawah: string;
    batasAtas: string;
  }): Promise<BorData> {
    try {
      const response = await ApiService.get<BorData>(
        API_ENDPOINTS.RANAP_INDICATORS,
        { params }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
