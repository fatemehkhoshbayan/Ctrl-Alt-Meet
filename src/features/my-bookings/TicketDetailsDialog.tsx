import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui';
import type { IBooking, IEvent } from '@/services';
import { formatDate } from '@/utils';
import { CalendarClock, MapPin, Ticket, Users } from 'lucide-react';
import { useState } from 'react';

interface ITicketDetailsDialogProps {
  booking: IBooking;
  event: IEvent;
}

export default function TicketDetailsDialog({ booking, event }: ITicketDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const formattedTotal = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(booking.totalPrice);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button BtnText="View Ticket" className="w-full" />
      </DialogTrigger>
      <DialogContent className="border-outline-variant/40 text-primary bg-surface-container-low flex max-h-[70vh] flex-col overflow-hidden p-0 sm:rounded-[2rem]">
        <div className="relative h-44 shrink-0 overflow-hidden sm:h-56">
          <img className="h-full w-full object-cover" src={event.imageUrl} alt={event.title} />
          <div className="from-background/95 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          <span className="bg-tertiary/15 text-tertiary border-tertiary/20 font-label-md text-label-md absolute bottom-6 left-6 rounded-full border px-5 py-2 font-bold backdrop-blur-sm">
            {event.category}
          </span>
        </div>

        <div className="overflow-y-auto p-6 pt-8 sm:p-10 sm:pt-8">
          <DialogHeader className="text-primary">
            <DialogTitle className="text-headline-lg-mobile md:text-headline-lg">
              {event.title}
            </DialogTitle>
            <DialogDescription className="text-body-lg leading-relaxed">
              {event.shortDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-outline-variant/40 bg-surface-container-low rounded-3xl border p-5">
              <div className="text-primary mb-4 flex items-center gap-3">
                <Ticket size={24} className="text-secondary shrink-0" />
                <h3 className="font-display text-title-md text-on-surface">Ticket Details</h3>
              </div>
              <dl className="text-body-md grid gap-3">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-on-surface-variant">Tier</dt>
                  <dd className="text-on-surface font-bold">{booking.ticketTierName}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-on-surface-variant">Quantity</dt>
                  <dd className="text-on-surface font-bold">{booking.quantity}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-on-surface-variant">Total</dt>
                  <dd className="text-on-surface font-bold">{formattedTotal}</dd>
                </div>
              </dl>
            </div>

            <div className="border-outline-variant/40 bg-surface-container-low rounded-3xl border p-5">
              <div className="text-primary mb-4 flex items-center gap-3">
                <CalendarClock size={24} className="text-secondary shrink-0" />
                <h3 className="font-display text-title-md text-on-surface">Event Schedule</h3>
              </div>
              <dl className="text-body-md grid gap-3">
                <div>
                  <dt className="text-on-surface-variant">Date</dt>
                  <dd className="text-on-surface font-bold">{formatDate(booking.eventDate)}</dd>
                </div>
                <div>
                  <dt className="text-on-surface-variant">Time</dt>
                  <dd className="text-on-surface font-bold">
                    {event.time} - {event.endTime}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="border-outline-variant/40 bg-surface-container-low mt-4 rounded-3xl border p-5">
            <div className="text-primary mb-4 flex items-center gap-3">
              <Users size={24} className="text-secondary shrink-0" />
              <h3 className="font-display text-title-md text-on-surface">About This Event</h3>
            </div>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              {event.description}
            </p>
          </div>

          <DialogFooter className="border-outline-variant/40 items-start sm:items-center sm:justify-between">
            <div className="text-on-surface-variant text-body-md flex items-start gap-4 font-bold">
              <MapPin size={24} className="text-secondary mt-0.5 shrink-0" />
              <span>
                {event.venue}, {event.location}
              </span>
            </div>
            <Button BtnText="Close" size="sm" color="secondary" onClick={() => setOpen(false)} />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
