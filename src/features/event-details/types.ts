import type { IEvent, TEventHighlight, TTicketTier } from '@/services';

export interface IEventProps {
  event: IEvent;
}

export interface IHighlightsSectionProps {
  highlights: TEventHighlight[];
}

export interface IPassCardProps {
  tier: TTicketTier;
  isSelected: boolean;
  onSelect: (tier: TTicketTier) => void;
}

export interface IRegistrationFormProps {
  event: IEvent;
  initialTier?: TTicketTier | null;
  onClose: () => void;
  onSuccess: () => void;
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
