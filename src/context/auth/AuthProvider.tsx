import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { IUser } from '@/services';
import { AuthContext, AUTH_STORAGE_KEY } from './AuthContext';
import { getStoredUser } from './getStoredUser';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((next: IUser) => {
    setUser(next);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
