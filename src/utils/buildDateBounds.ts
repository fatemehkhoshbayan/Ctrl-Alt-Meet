export default function buildDateBounds(dateRange: string): { start?: string; end?: string } {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  if (dateRange === 'upcoming') {
    return { start: toISO(now) };
  }
  if (dateRange === 'today') {
    const today = toISO(now);
    return { start: today, end: today };
  }
  if (dateRange === 'this-week') {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return { start: toISO(weekStart), end: toISO(weekEnd) };
  }
  if (dateRange === 'this-month') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start: toISO(monthStart), end: toISO(monthEnd) };
  }
  if (dateRange === 'this-year') {
    return { start: `${now.getFullYear()}-01-01`, end: `${now.getFullYear()}-12-31` };
  }
  return {};
}
