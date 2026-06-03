export function formatDate(date: string | undefined): string {
  if (!date) return '';

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) return '';

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return formatter.format(parsed);
}

export default function formatDateRange(start: string, end: string): string {
  if (!start || !end) return '';
  if (start === end) return formatDate(start);

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  const sameMonthYear =
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCFullYear() === endDate.getUTCFullYear();

  if (sameMonthYear) {
    const month = startDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    return `${month} ${startDate.getUTCDate()}–${endDate.getUTCDate()}, ${startDate.getUTCFullYear()}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
}
