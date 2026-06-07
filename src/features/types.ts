import type { IEvent, TEventHighlight, TTicketTier } from '@/services';

export interface IEventProps {
  event: IEvent;
}

export interface IHighlightsSectionProps {
  highlights: TEventHighlight[];
}

export interface IRegistrationFormProps {
  event: IEvent;
  initialTier?: TTicketTier | null;
  onClose: () => void;
}

export type TBookingStep = 1 | 2 | 3;

export type TAttendeeFormValues = {
  name: string;
  email: string;
  phone: string;
};

export type TAttendeesFormValues = {
  attendees: TAttendeeFormValues[];
};

export interface ISuccessViewProps {
  bookingReference: string;
  eventTitle: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
  onDone: () => void;
  onMyBookings: () => void;
}

export interface ITicketSelectionStep {
  tiers: TTicketTier[];
  selectedTier: TTicketTier | null;
  onSelectTier: (tier: TTicketTier) => void;
  quantity: number;
  onQuantityChange: (n: number) => void;
  maxQuantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface IBookingSummaryStep {
  eventTitle: string;
  tier: TTicketTier;
  quantity: number;
  totalAmount: number;
  attendees: TAttendeeFormValues[];
}
