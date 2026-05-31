import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = JSON.parse(readFileSync(join(__dirname, '../db.json'), 'utf8'));

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.query;

  if (id) {
    const event = db.events.find(e => e.id === id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(event);
  }

  res.status(200).json(db.events);
}
