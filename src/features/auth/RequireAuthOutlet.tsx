import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks';

export default function RequireAuthOutlet() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname, ...location.state }} replace />;
  }

  return <Outlet />;
}
