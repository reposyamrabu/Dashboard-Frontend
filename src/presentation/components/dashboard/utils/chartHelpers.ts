export function safeParseFloat(v: unknown): number {
  const n = parseFloat(String(v ?? '0'));
  return Number.isFinite(n) ? n : 0;
}

export function getProgressPercentage(value: number, maxScale: number): number {
  return Math.min((value / maxScale) * 100, 100);
}
