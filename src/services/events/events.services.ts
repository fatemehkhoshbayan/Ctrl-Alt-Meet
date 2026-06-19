import { clients } from '../clients';
import eventsEndpoint from './events.endpoint';
import type { IEvent, TTicketTier } from './events.type';

const eventsServices = {
  getEvents: () => clients<IEvent[]>(eventsEndpoint.events, { method: 'GET' }),
  getEventById: (id: string) => clients<IEvent>(eventsEndpoint.eventById(id), { method: 'GET' }),
  getFeaturedEvents: () => clients<IEvent[]>(eventsEndpoint.featuredEvents, { method: 'GET' }),
  purchaseTicket: (eventId: string, updatedTiers: TTicketTier[]) =>
    clients<IEvent>(eventsEndpoint.purchaseTicket(eventId), {
      method: 'PATCH',
      body: JSON.stringify({ ticketTiers: updatedTiers }),
    }),
};

export default eventsServices;
