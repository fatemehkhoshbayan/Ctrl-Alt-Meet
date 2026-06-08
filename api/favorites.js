import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = JSON.parse(readFileSync(join(__dirname, '../db.json'), 'utf8'));

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { id, userId } = req.query;

  if (id) {
    const favorite = db.favorites?.find(f => f.id === id);
    if (!favorite) return res.status(404).json({ error: 'Favorite not found' });
    return res.status(200).json(favorite);
  }

  if (userId) {
    const favorites = (db.favorites ?? []).filter(f => f.userId === userId);
    return res.status(200).json(favorites);
  }

  res.status(200).json(db.favorites ?? []);
}
