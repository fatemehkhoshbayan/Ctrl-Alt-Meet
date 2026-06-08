import { getEventById, getEvents, parseJsonBody, setCorsHeaders, updateEvent } from './_db.js';

export default async function handler(req, res) {
  setCorsHeaders(res, 'GET, PATCH, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const event = await getEventById(id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        return res.status(200).json(event);
      }

      const events = await getEvents();
      if (req.query.isFeatured === 'true') {
        return res.status(200).json(events.filter(event => event.isFeatured));
      }

      return res.status(200).json(events);
    }

    if (req.method === 'PATCH') {
      if (!id) return res.status(400).json({ error: 'Event id is required' });

      const event = await updateEvent(id, parseJsonBody(req));
      if (!event) return res.status(404).json({ error: 'Event not found' });
      return res.status(200).json(event);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
