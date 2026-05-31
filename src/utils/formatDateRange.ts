export default function formatDateRange(start: string, end: string): string {
  const fmt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  if (start === end) return fmt.format(new Date(start));

  const s = new Date(start);
  const e = new Date(end);
  const sameMonthYear =
    s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();

  if (sameMonthYear) {
    const month = s.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    return `${month} ${s.getUTCDate()}–${e.getUTCDate()}, ${s.getUTCFullYear()}`;
  }

  return `${fmt.format(s)} – ${fmt.format(e)}`;
}
