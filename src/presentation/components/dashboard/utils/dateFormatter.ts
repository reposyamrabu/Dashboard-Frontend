export function formatDateTime(date: Date | null): string {
  if (!date) return '';

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  );
}
