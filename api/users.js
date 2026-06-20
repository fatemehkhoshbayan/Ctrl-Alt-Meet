import {
  createUser,
  getUserById,
  getUsers,
  parseJsonBody,
  setCorsHeaders,
  updateUser,
} from './_db.js';

function stripPassword(user) {
  if (!user) return user;
  const { password: _, ...safeUser } = user;
  return safeUser;
}

function stripPasswordFromList(users) {
  return users.map(stripPassword);
}

export default async function handler(req, res) {
  setCorsHeaders(res, 'GET, POST, PATCH, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id, email } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(stripPassword(user));
      }

      return res.status(200).json(stripPasswordFromList(await getUsers(email)));
    }

    if (req.method === 'POST') {
      const payload = parseJsonBody(req);
      if (!payload.name || !payload.email || !payload.password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      return res.status(201).json(stripPassword(await createUser(payload)));
    }

    if (req.method === 'PATCH') {
      if (!id) return res.status(400).json({ error: 'User id is required' });

      const user = await updateUser(id, parseJsonBody(req));
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json(stripPassword(user));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message ?? 'Internal server error' });
  }
}
