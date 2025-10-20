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

export const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        color: '#6b7280',
        font: {
          size: 10,
        },
        usePointStyle: true,
        pointStyle: 'rect',
      },
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
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 10,
        },
      },
    },
    y: {
      stacked: true,
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 10,
        },
      },
      beginAtZero: true,
    },
  },
};
