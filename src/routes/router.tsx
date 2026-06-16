import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { RequireAuthOutlet } from '@/features';
import { MainLayout } from '@/layouts';
import { FallbackPage, NotFoundState } from '@/shared';
import { RouteErrorBoundary } from './';

const routeErrorBoundary: Pick<RouteObject, 'errorElement'> = {
  errorElement: <RouteErrorBoundary />,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    ...routeErrorBoundary,
    children: [
      {
        index: true,
        hydrateFallbackElement: <FallbackPage message="Loading events..." />,
        lazy: () => import('@/pages/Events').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'events/:id',
        hydrateFallbackElement: <FallbackPage message="Loading details event..." />,
        lazy: () => import('@/pages/EventDetails').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'speakers',
        hydrateFallbackElement: <FallbackPage message="Loading speakers..." />,
        lazy: () => import('@/pages/Speakers').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'login',
        hydrateFallbackElement: <FallbackPage message="Loading login..." />,
        lazy: () => import('@/pages/Login').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        element: <RequireAuthOutlet />,
        children: [
          {
            path: 'my-bookings',
            hydrateFallbackElement: <FallbackPage message="Loading bookings..." />,
            lazy: () => import('@/pages/MyBooking').then(module => ({ Component: module.default })),
            ...routeErrorBoundary,
          },
          {
            path: 'registration',
            hydrateFallbackElement: <FallbackPage message="Loading registration..." />,
            lazy: () =>
              import('@/pages/Registration').then(module => ({ Component: module.default })),
            ...routeErrorBoundary,
          },
          {
            path: 'favorites',
            hydrateFallbackElement: <FallbackPage message="Loading favorites..." />,
            lazy: () => import('@/pages/Favorites').then(module => ({ Component: module.default })),
            ...routeErrorBoundary,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundState />,
        ...routeErrorBoundary,
      },
    ],
  },
]);

export default router;
