import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Redis } from '@upstash/redis';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '../db.json');
const KEY_PREFIX = process.env.REDIS_KEY_PREFIX ?? 'ctrl-alt-meet';

const COLLECTIONS = ['events', 'bookings', 'favorites', 'users', 'speakers', 'categories'];

let redis;
let seedDb;
let memoryDb;

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  if (!redis) {
    redis = Redis.fromEnv();
  }
  return redis;
}

function getSeedDb() {
  if (!seedDb) {
    seedDb = JSON.parse(readFileSync(DB_PATH, 'utf8'));
  }
  return seedDb;
}

function getMemoryDb() {
  if (!memoryDb) {
    memoryDb = structuredClone(getSeedDb());
  }
  return memoryDb;
}

function collectionKey(name) {
  return `${KEY_PREFIX}:${name}`;
}

function normalizeCollection(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return JSON.parse(value);
  return [];
}

async function getCollection(name) {
  const client = getRedis();

  if (client) {
    try {
      const cached = await client.get(collectionKey(name));
      if (cached !== null && cached !== undefined) {
        return normalizeCollection(cached);
      }

      const seed = getSeedDb()[name] ?? [];
      await client.set(collectionKey(name), seed);
      return seed;
    } catch {
      // Keep the mock API usable if Redis is missing or temporarily unavailable.
    }
  }

  return getMemoryDb()[name] ?? [];
}

async function setCollection(name, items) {
  const client = getRedis();

  if (client) {
    try {
      await client.set(collectionKey(name), items);
    } catch {
      // Fall back to per-instance memory so writes still return the expected shape.
    }
  }

  getMemoryDb()[name] = items;
  return items;
}

export async function seedDatabase() {
  const client = getRedis();
  if (!client) return;

  const db = getSeedDb();
  await Promise.all(
    COLLECTIONS.map(async collection => {
      const existing = await client.get(collectionKey(collection));
      if (existing === null || existing === undefined) {
        await client.set(collectionKey(collection), db[collection] ?? []);
      }
    }),
  );
}

export async function getEvents() {
  return getCollection('events');
}

export async function getEventById(id) {
  const events = await getEvents();
  return events.find(event => event.id === id) ?? null;
}

export async function updateEvent(id, patch) {
  const events = await getEvents();
  const index = events.findIndex(event => event.id === id);
  if (index === -1) return null;

  const updated = { ...events[index], ...patch };
  events[index] = updated;
  await setCollection('events', events);
  return updated;
}

export async function getBookings(userId) {
  const bookings = await getCollection('bookings');
  return userId ? bookings.filter(booking => booking.userId === userId) : bookings;
}

export async function getBookingById(id) {
  const bookings = await getCollection('bookings');
  return bookings.find(booking => booking.id === id) ?? null;
}

export async function createBooking(payload) {
  const bookings = await getCollection('bookings');
  const booking = { ...payload, id: payload.id ?? randomUUID() };
  await setCollection('bookings', [booking, ...bookings]);
  return booking;
}

export async function cancelBooking(id) {
  const bookings = await getCollection('bookings');
  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) return null;

  const updated = { ...bookings[index], status: 'cancelled' };
  bookings[index] = updated;
  await setCollection('bookings', bookings);
  return updated;
}

export async function getFavorites(userId) {
  const favorites = await getCollection('favorites');
  return userId ? favorites.filter(favorite => favorite.userId === userId) : favorites;
}

export async function getFavoriteById(id) {
  const favorites = await getCollection('favorites');
  return favorites.find(favorite => favorite.id === id) ?? null;
}

export async function createFavorite(payload) {
  const favorites = await getCollection('favorites');
  const existing = favorites.find(
    favorite => favorite.userId === payload.userId && favorite.eventId === payload.eventId,
  );
  if (existing) return existing;

  const favorite = { ...payload, id: payload.id ?? randomUUID() };
  await setCollection('favorites', [favorite, ...favorites]);
  return favorite;
}

export async function deleteFavorite(id) {
  const favorites = await getCollection('favorites');
  const favorite = favorites.find(item => item.id === id);
  if (!favorite) return null;

  await setCollection(
    'favorites',
    favorites.filter(item => item.id !== id),
  );
  return favorite;
}

export async function getUsers(email) {
  const users = await getCollection('users');
  return email ? users.filter(user => user.email === email) : users;
}

export async function getUserById(id) {
  const users = await getCollection('users');
  return users.find(user => user.id === id) ?? null;
}

export async function createUser(payload) {
  const users = await getCollection('users');
  const user = { ...payload, id: payload.id ?? randomUUID() };
  await setCollection('users', [...users, user]);
  return user;
}

export async function getSpeakers() {
  return getCollection('speakers');
}

export async function getSpeakerById(id) {
  const speakers = await getSpeakers();
  return speakers.find(speaker => speaker.id === id) ?? null;
}

export async function getCategories() {
  return getCollection('categories');
}

export function parseJsonBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body;
}

export function setCorsHeaders(res, methods) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
}
