import { useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname, ...location.state }, replace: true });
    }
  }, [user, navigate, location.pathname, location.state]);

  if (!user) return null;

  return children;
}
