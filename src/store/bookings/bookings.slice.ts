import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  bookingsServices,
  INITIAL_BOOKINGS_STATE,
  type PurchaseTicketPayload,
  type TCreateBookingPayload,
} from '@/services';
import { generateBookingReference } from '@/utils';

export const createRegistrationBooking = createAsyncThunk(
  'bookings/createRegistrationBooking',
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

    const booking = await bookingsServices.createBooking(bookingPayload);

    return { booking, bookingReference };
  },
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: INITIAL_BOOKINGS_STATE,
  reducers: {
    resetPurchaseStatus(state) {
      state.purchaseStatus = 'idle';
      state.error = null;
    },
    clearBookingSuccess(state) {
      state.bookingSuccess = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createRegistrationBooking.pending, state => {
        state.purchaseStatus = 'loading';
        state.error = null;
      })
      .addCase(createRegistrationBooking.fulfilled, (state, action) => {
        const { booking, bookingReference } = action.payload;
        state.purchaseStatus = 'succeeded';
        state.bookingSuccess = {
          reference: bookingReference,
          eventTitle: booking.eventTitle,
          tierName: booking.ticketTierName,
          quantity: booking.quantity,
          totalAmount: booking.totalPrice,
        };
      })
      .addCase(createRegistrationBooking.rejected, (state, action) => {
        state.purchaseStatus = 'failed';
        state.error = action.error.message ?? 'Booking failed';
      });
  },
});

export const { resetPurchaseStatus, clearBookingSuccess } = bookingsSlice.actions;
export default bookingsSlice.reducer;
