export interface DashboardAvgPasienProps {
  jml_ird: string;
  jml_rwj: string;
  jml_rwi: string;
  jml_total: string;
}

export interface DashboardRawatJalanSumProps {
  nama_unit: string;
  jml_current: string;
}

export interface DashboardRawatJalanSumProps {
  name: string;
  data: number[];
}

export interface DashboardRawatInapSeries {
  name: string;
  data: number[];
}

export interface DashboardRawatInapSumProps {
  name: string;
  total: number;
}

export interface BorItem {
  hari_perawatan: string;
  tt: string;
  jml_periode: number;
  bor: string;
}

export interface LosItem {
  lama_dirawat: string;
  pasien_keluar: string;
  alos: string;
}

export interface BtoItem {
  jml_pasien_keluar: string;
  jml_tempat: string;
  bto: string;
}

export interface ToiItem {
  tt: string;
  jml_periode: number;
  hari_perawatan: string;
  jml_pasien_keluar: string;
  toi: string;
}

export interface NdrItem {
  pasien_keluar: string;
  pasien_meninggal: string;
  hasil: string;
}

export interface GdrItem {
  pasien_keluar: string;
  pasien_meninggal: string;
  hasil: string;
}

export interface BorData {
  BOR?: BorItem[];
  LOS?: LosItem[];
  BTO?: BtoItem[];
  TOI?: ToiItem[];
  NDR?: NdrItem[];
  GDR?: GdrItem[];
}

export interface BedAvailableProps {
  kd_ruangperawatan: number;
  nama_ruangperawatan: string;
  kapasitas: string;
  terpakai: string;
  sisa: string;
}
