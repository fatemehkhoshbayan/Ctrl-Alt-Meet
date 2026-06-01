import { clients } from '../clients';
import type { IEvent, IPaginatedResponse, TTicketTier } from './events.type';
import type { EventFilters } from '@/store/events/events.slice';

function buildDateBounds(dateRange: string): { startDate?: string; endDate?: string } {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  if (dateRange === 'today') {
    const today = toISO(now);
    return { startDate: today, endDate: today };
  }
  if (dateRange === 'this-week') {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return { startDate: toISO(weekStart), endDate: toISO(weekEnd) };
  }
  if (dateRange === 'this-month') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { startDate: toISO(monthStart), endDate: toISO(monthEnd) };
  }
  if (dateRange === 'this-year') {
    return {
      startDate: `${now.getFullYear()}-01-01`,
      endDate: `${now.getFullYear()}-12-31`,
    };
  }
  return {};
}

export const eventsApi = {
  getAll: () => clients<IEvent[]>('/events', { method: 'GET' }),
  getById: (id: string) => clients<IEvent>(`/events/${id}`, { method: 'GET' }),
  getFeatured: () => clients<IEvent[]>('/events?isFeatured=true', { method: 'GET' }),
  getPaginated: (page: number, perPage: number, filters?: EventFilters) => {
    const params = new URLSearchParams({
      _page: String(page),
      _per_page: String(perPage),
    });

    if (filters) {
      const { startDate, endDate } = buildDateBounds(filters.dateRange);
      if (startDate) params.set('date_gte', startDate);
      if (endDate) params.set('date_lte', endDate);
    }

    return clients<IPaginatedResponse<IEvent>>(`/events?${params.toString()}`, { method: 'GET' });
  },
  purchaseTicket: (eventId: string, updatedTiers: TTicketTier[]) =>
    clients<IEvent>(`/events/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify({ ticketTiers: updatedTiers }),
    }),
};
