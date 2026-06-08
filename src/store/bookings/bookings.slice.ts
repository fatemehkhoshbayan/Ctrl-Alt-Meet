import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingsApi, eventsApi } from '@/services';
import type { IEvent, IBooking, TBookingAttendee, TCreateBookingPayload } from '@/services';
import { generateBookingReference } from '@/utils';

export interface IBookingSuccess {
  reference: string;
  eventTitle: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
}

interface BookingsState {
  items: IBooking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  purchaseStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  bookingSuccess: IBookingSuccess | null;
}

const initialState: BookingsState = {
  items: [],
  status: 'idle',
  purchaseStatus: 'idle',
  error: null,
  bookingSuccess: null,
};

export type PurchaseTicketPayload = {
  event: IEvent;
  tierId: string;
  quantity: number;
  attendees: TBookingAttendee[];
  userId: string;
};

export const fetchBookings = createAsyncThunk('bookings/fetchAll', (userId: string) =>
  bookingsApi.getByUserId(userId),
);

export const cancelBooking = createAsyncThunk('bookings/cancel', (bookingId: string) =>
  bookingsApi.cancel(bookingId),
);

export const purchaseTicket = createAsyncThunk(
  'bookings/purchaseTicket',
  async ({ event, tierId, quantity, attendees, userId }: PurchaseTicketPayload) => {
    const tier = event.ticketTiers.find(t => t.id === tierId);
    if (!tier) {
      throw new Error('Ticket tier not found');
    }

    const bookingReference = generateBookingReference();
    const totalPrice = tier.price * quantity;

    const bookingPayload: TCreateBookingPayload = {
      userId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: `${event.venue}, ${event.city}, ${event.country}`,
      ticketTierId: tier.id,
      ticketTierName: tier.name,
      quantity,
      unitPrice: tier.price,
      totalPrice,
      status: 'confirmed',
      bookingReference,
      bookedAt: new Date().toISOString(),
      attendees,
    };

    const updatedTiers = event.ticketTiers.map(t =>
      t.id === tierId ? { ...t, available: Math.max(0, t.available - quantity) } : t,
    );

    const [updatedEvent, booking] = await Promise.all([
      eventsApi.purchaseTicket(event.id, updatedTiers),
      bookingsApi.create(bookingPayload),
    ]);

    return { event: updatedEvent, booking, bookingReference };
  },
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    resetPurchaseStatus(state) {
      state.purchaseStatus = 'idle';
    },
    clearBookingSuccess(state) {
      state.bookingSuccess = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBookings.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load bookings';
      })
      .addCase(purchaseTicket.pending, state => {
        state.purchaseStatus = 'loading';
        state.error = null;
      })
      .addCase(purchaseTicket.fulfilled, (state, action) => {
        const { booking, bookingReference } = action.payload;
        state.purchaseStatus = 'succeeded';
        state.items = [booking, ...state.items];
        state.bookingSuccess = {
          reference: bookingReference,
          eventTitle: booking.eventTitle,
          tierName: booking.ticketTierName,
          quantity: booking.quantity,
          totalAmount: booking.totalPrice,
        };
      })
      .addCase(purchaseTicket.rejected, (state, action) => {
        state.purchaseStatus = 'failed';
        state.error = action.error.message ?? 'Booking failed';
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.items.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to cancel booking';
      });
  },
});

export const { resetPurchaseStatus, clearBookingSuccess } = bookingsSlice.actions;
export default bookingsSlice.reducer;
