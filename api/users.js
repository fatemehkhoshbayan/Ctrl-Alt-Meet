import { createUser, getUserById, getUsers, parseJsonBody, setCorsHeaders } from './_db.js';

export default async function handler(req, res) {
  setCorsHeaders(res, 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id, email } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(user);
      }

      return res.status(200).json(await getUsers(email));
    }

    if (req.method === 'POST') {
      const payload = parseJsonBody(req);
      if (!payload.name || !payload.email || !payload.password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      return res.status(201).json(await createUser(payload));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
