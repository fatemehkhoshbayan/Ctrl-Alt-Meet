import type { IUser } from '@/services';
import { AUTH_STORAGE_KEY } from './AuthContext';

export function getStoredUser(): IUser | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as IUser;
  } catch {
    return null;
  }
}
