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
    const speaker = db.speakers.find(s => s.id === id);
    if (!speaker) return res.status(404).json({ error: 'Speaker not found' });
    return res.status(200).json(speaker);
  }

  res.status(200).json(db.speakers);
}
