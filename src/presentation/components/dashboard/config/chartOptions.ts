import type { ChartOptions } from 'chart.js';

export const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#10b981',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#6b7280',
        font: { size: 10 },
      },
    },
    y: {
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        color: '#6b7280',
        font: { size: 10 },
        stepSize: 1000,
      },
      beginAtZero: true,
    },
  },
};

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        color: '#6b7280',
        font: { size: 10 },
        usePointStyle: true,
        pointStyle: 'rect',
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: { color: '#6b7280', font: { size: 10 } },
      grid: { color: '#f3f4f6', borderDash: [2, 2] },
      beginAtZero: true,
    },
    y: {
      stacked: true,
      ticks: {
        color: '#6b7280',
        font: { size: 10 },
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
      grid: { display: false },
    },
  },
};
