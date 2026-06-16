import { clients } from '../clients';
import eventsEndpoint from './events.endpoint';
import { buildDateBounds } from '@/utils';
import type { EventFilters, IEvent, IPaginatedResponse, TTicketTier } from './events.type';

const eventsServices = {
  getEvents: () => clients<IEvent[]>(eventsEndpoint.events, { method: 'GET' }),
  getEventById: (id: string) => clients<IEvent>(eventsEndpoint.eventById(id), { method: 'GET' }),
  getFeaturedEvents: () => clients<IEvent[]>(eventsEndpoint.featuredEvents, { method: 'GET' }),
  getPaginated: (page: number, perPage: number, filters?: EventFilters) => {
    const params = new URLSearchParams({
      _page: String(page),
      _per_page: String(perPage),
    });

    if (filters) {
      const { start, end } = buildDateBounds(filters.dateRange);
      if (start) params.set('date_gte', start);
      if (end) params.set('date_lte', end);
    }

    return clients<IPaginatedResponse<IEvent>>(eventsEndpoint.paginatedEvents(params), {
      method: 'GET',
    });
  },
  purchaseTicket: (eventId: string, updatedTiers: TTicketTier[]) =>
    clients<IEvent>(eventsEndpoint.purchaseTicket(eventId), {
      method: 'PATCH',
      body: JSON.stringify({ ticketTiers: updatedTiers }),
    }),
};

export default eventsServices;
