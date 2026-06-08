import {
  createFavorite,
  deleteFavorite,
  getFavoriteById,
  getFavorites,
  parseJsonBody,
  setCorsHeaders,
} from './_db.js';

export default async function handler(req, res) {
  setCorsHeaders(res, 'GET, POST, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id, userId } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const favorite = await getFavoriteById(id);
        if (!favorite) return res.status(404).json({ error: 'Favorite not found' });
        return res.status(200).json(favorite);
      }

      return res.status(200).json(await getFavorites(userId));
    }

    if (req.method === 'POST') {
      const payload = parseJsonBody(req);
      if (!payload.userId || !payload.eventId) {
        return res.status(400).json({ error: 'userId and eventId are required' });
      }

      return res.status(201).json(await createFavorite(payload));
    }

    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'Favorite id is required' });

      const favorite = await deleteFavorite(id);
      if (!favorite) return res.status(404).json({ error: 'Favorite not found' });
      return res.status(200).json(favorite);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
