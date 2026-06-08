import {
  cancelBooking,
  createBooking,
  getBookingById,
  getBookings,
  parseJsonBody,
  setCorsHeaders,
} from './_db.js';

export default async function handler(req, res) {
  setCorsHeaders(res, 'GET, POST, PATCH, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id, userId } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const booking = await getBookingById(id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        return res.status(200).json(booking);
      }

      return res.status(200).json(await getBookings(userId));
    }

    if (req.method === 'POST') {
      const payload = parseJsonBody(req);
      if (!payload.userId || !payload.eventId || typeof payload.totalPrice !== 'number') {
        return res.status(400).json({ error: 'Booking payload is incomplete' });
      }

      return res.status(201).json(await createBooking(payload));
    }

    if (req.method === 'PATCH') {
      if (!id) return res.status(400).json({ error: 'Booking id is required' });

      const booking = await cancelBooking(id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      return res.status(200).json(booking);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
