import { getSpeakerById, getSpeakers, setCorsHeaders } from './_db.js';

export default async function handler(req, res) {
  setCorsHeaders(res, 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query;

    if (id) {
      const speaker = await getSpeakerById(id);
      if (!speaker) return res.status(404).json({ error: 'Speaker not found' });
      return res.status(200).json(speaker);
    }

    return res.status(200).json(await getSpeakers());
  } catch (error) {
    return res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
