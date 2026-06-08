import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = JSON.parse(readFileSync(join(__dirname, '../db.json'), 'utf8'));

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, userId } = req.query;

  if (id) {
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (req.method === 'PATCH') {
      return res.status(200).json({ ...booking, status: 'cancelled' });
    }

    return res.status(200).json(booking);
  }

  if (userId) {
    const bookings = db.bookings.filter(b => b.userId === userId);
    return res.status(200).json(bookings);
  }

  res.status(200).json(db.bookings);
}
