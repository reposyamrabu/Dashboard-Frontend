# Kominfo Dashboard - SOLID Refactoring

## Overview

Dashboard ini telah di-refactor menggunakan prinsip-prinsip SOLID untuk meningkatkan maintainability, testability, dan scalability kode.

## Struktur Folder

```
dashboard/
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── BedAvailabilityChart.tsx
│   ├── ChartCard.tsx
│   ├── IndicatorCard.tsx
│   ├── IndicatorsSection.tsx
│   ├── KPICard.tsx
│   ├── LoadingChart.tsx
│   ├── PeriodSelector.tsx
│   ├── RawatInapChart.tsx
│   └── RawatJalanChart.tsx
├── config/              # Konfigurasi chart dan data statis
│   ├── chartOptions.ts
│   └── indicators.ts
├── hooks/               # Custom React hooks untuk logic bisnis
│   ├── useBedFilter.ts
│   ├── useDashboardData.ts
│   └── useDateRange.ts
├── utils/               # Utility functions
│   ├── chartHelpers.ts
│   └── dateFormatter.ts
├── KominfoDashboard.tsx # Main component
└── index.ts            # Public exports
```

## Penerapan Prinsip SOLID

### 1. Single Responsibility Principle (SRP)

**Sebelum:** Satu komponen besar menangani semua logic (800+ baris)
**Sesudah:** Dipecah menjadi beberapa modul dengan tanggung jawab spesifik:

- **Hooks**: Menangani state management dan data fetching
- **Components**: Hanya fokus pada rendering UI
- **Utils**: Fungsi-fungsi utility yang murni
- **Config**: Konfigurasi statis

**Contoh:**

```typescript
// useDateRange.ts - Hanya menangani date range logic
export function useDateRange(defaultType: DateRangeType = 'Today') {
  // Logic khusus untuk date range
}

// useDashboardData.ts - Hanya menangani data fetching
export function useDashboardData({ dateRange }: UseDashboardDataProps) {
  // Logic khusus untuk fetch data
}
```

### 2. Open/Closed Principle (OCP)

**Diterapkan pada:**

- **Chart Components**: Dapat menerima data berbeda tanpa perlu modifikasi
- **Indicator System**: Mudah menambah indicator baru tanpa mengubah komponen

**Contoh:**

```typescript
// Menambah indicator baru hanya perlu menambahkan di array
export function getIndicators(borData?: BorData): Indicator[] {
  return [
    { label: 'BOR', value: ..., unit: '%', ... },
    // Tambah indicator baru di sini tanpa ubah kode lain
  ];
}
```

### 3. Liskov Substitution Principle (LSP)

**Diterapkan pada:**

- Semua chart components memiliki interface yang konsisten
- Props types yang jelas dan dapat ditukar

**Contoh:**

```typescript
// Semua chart components dapat menggantikan satu sama lain
interface BaseChartProps {
  data?: any[];
  isLoading: boolean;
}
```

### 4. Interface Segregation Principle (ISP)

**Diterapkan pada:**

- Setiap komponen hanya menerima props yang dibutuhkan
- Tidak ada "God Object" yang memaksa implementasi method tidak perlu

**Contoh:**

```typescript
// KPICard hanya butuh 3 props
interface KPICardProps {
  title: string;
  value: number | string;
  isLoading: boolean;
}

// IndicatorCard punya props berbeda sesuai kebutuhannya
interface IndicatorCardProps {
  indicator: Indicator;
}
```

### 5. Dependency Inversion Principle (DIP)

**Diterapkan pada:**

- Components bergantung pada abstraksi (interfaces/types), bukan implementasi konkret
- Service layer dapat diganti tanpa mengubah components

**Contoh:**

```typescript
// Hook bergantung pada DashboardService (abstraksi)
// Bisa diganti implementasinya tanpa ubah hook
const res = await DashboardService.loadAvgPasien({ ... });
```

## Keuntungan Refactoring

### 1. **Maintainability** ✅

- Kode lebih mudah dibaca dan dipahami
- Setiap file < 150 baris, mudah di-navigate
- Bug lebih mudah ditemukan dan diperbaiki

### 2. **Testability** ✅

- Setiap fungsi dan hook dapat di-test secara isolated
- Mock data lebih mudah diimplementasikan
- Unit test dapat dibuat untuk setiap bagian

### 3. **Reusability** ✅

- Komponen dapat digunakan di dashboard lain
- Hooks dapat digunakan di komponen lain
- Utils dapat digunakan di seluruh aplikasi

### 4. **Scalability** ✅

- Mudah menambah chart baru
- Mudah menambah indicator baru
- Mudah menambah KPI card baru

### 5. **Collaboration** ✅

- Tim dapat bekerja pada file berbeda tanpa konflik
- Code review lebih mudah karena file lebih kecil
- Onboarding developer baru lebih cepat

## Cara Penggunaan

### Import Dashboard

```typescript
import { KominfoDashboard } from '@/presentation/components/dashboard';

// Gunakan di App
<KominfoDashboard />
```

### Menggunakan Hooks Secara Terpisah

```typescript
import { useDateRange } from '@/presentation/components/dashboard/hooks/useDateRange';
import { useDashboardData } from '@/presentation/components/dashboard/hooks/useDashboardData';

function MyCustomDashboard() {
  const { dateRange, handleRangeShortcut } = useDateRange('Today');
  const { avgPasien, isLoadingAvgPasien } = useDashboardData({ dateRange });

  // Custom implementation...
}
```

### Menggunakan Components Secara Terpisah

```typescript
import { KPICard } from '@/presentation/components/dashboard/components/KPICard';
import { ChartCard } from '@/presentation/components/dashboard/components/ChartCard';

function MyPage() {
  return (
    <>
      <KPICard title="Total Users" value={1000} isLoading={false} />
      <ChartCard title="Analytics">
        {/* Your custom chart */}
      </ChartCard>
    </>
  );
}
```

## Testing Guide

### Testing Hooks

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useDateRange } from './hooks/useDateRange';

describe('useDateRange', () => {
  it('should initialize with default date range', () => {
    const { result } = renderHook(() => useDateRange('Today'));
    expect(result.current.activeShortcut).toBe('Today');
  });
});
```

### Testing Components

```typescript
import { render, screen } from '@testing-library/react';
import { KPICard } from './components/KPICard';

describe('KPICard', () => {
  it('should display loading state', () => {
    render(<KPICard title="Test" value={100} isLoading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
```

## Migration dari Versi Lama

File lama `src/presentation/components/KominfoDashboard.tsx` sekarang hanya menjadi proxy ke implementasi baru. Semua import tetap berfungsi:

```typescript
// Ini masih bekerja
import KominfoDashboard from '@/presentation/components/KominfoDashboard';

// Dan ini juga bekerja
import { KominfoDashboard } from '@/presentation/components/dashboard';
```

## Future Improvements

1. **Error Boundary**: Tambah error handling yang lebih baik
2. **Loading States**: Implement skeleton loading yang lebih canggih
3. **Caching Strategy**: Optimize data fetching dengan cache yang lebih baik
4. **Accessibility**: Tambah ARIA labels dan keyboard navigation
5. **Internationalization**: Tambah support multi-bahasa
6. **Theme Support**: Tambah dark mode dan custom themes
7. **Export Features**: Tambah kemampuan export chart ke PNG/PDF
8. **Real-time Updates**: Implement WebSocket untuk real-time data

## Kontribusi

Saat menambah fitur baru, pastikan untuk:

1. Ikuti prinsip SOLID yang sudah ada
2. Buat komponen kecil dan focused
3. Tambah TypeScript types yang jelas
4. Update dokumentasi ini jika perlu

## References

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [React Hooks Best Practices](https://react.dev/reference/react)
