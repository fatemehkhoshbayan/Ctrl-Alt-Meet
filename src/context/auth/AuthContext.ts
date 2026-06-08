import { createContext } from 'react';
import type { IUser } from '@/services';

export type AuthContextValue = {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
};

export const AUTH_STORAGE_KEY = 'ctrl-alt-meet-user';

export const AuthContext = createContext<AuthContextValue | null>(null);
