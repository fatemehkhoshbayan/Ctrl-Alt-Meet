import { createBrowserRouter, Outlet, type RouteObject } from 'react-router-dom';
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
        id: 'events-root',
        loader: async () => {
          const { eventsLoader } = await import('@/services');
          return eventsLoader();
        },
        element: <Outlet />,
        children: [
          {
            index: true,
            hydrateFallbackElement: <FallbackPage message="Loading events..." />,
            lazy: () => import('@/pages/Events').then(module => ({ Component: module.default })),
            ...routeErrorBoundary,
          },
          {
            path: 'events/:id',
            id: 'event-details',
            hydrateFallbackElement: <FallbackPage message="Loading details event..." />,
            lazy: async () => {
              const [{ default: Component }, { eventDetailsLoader }] = await Promise.all([
                import('@/pages/EventDetails'),
                import('@/services'),
              ]);
              return { Component, loader: eventDetailsLoader };
            },
            ...routeErrorBoundary,
          },
        ],
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
        id: 'authenticated',
        element: <RequireAuthOutlet />,
        children: [
          {
            path: 'my-bookings',
            id: 'my-bookings',
            hydrateFallbackElement: <FallbackPage message="Loading bookings..." />,
            lazy: async () => {
              const [{ default: Component }, { myBookingsLoader }] = await Promise.all([
                import('@/pages/MyBooking'),
                import('@/services'),
              ]);
              return { Component, loader: myBookingsLoader };
            },
            ...routeErrorBoundary,
          },
          {
            path: 'registration',
            id: 'registration',
            hydrateFallbackElement: <FallbackPage message="Loading registration..." />,
            lazy: () =>
              import('@/pages/Registration').then(module => ({ Component: module.default })),
            ...routeErrorBoundary,
          },
          {
            path: 'favorites',
            id: 'favorites',
            hydrateFallbackElement: <FallbackPage message="Loading favorites..." />,
            lazy: async () => {
              const [{ default: Component }, { favoritesLoader }] = await Promise.all([
                import('@/pages/Favorites'),
                import('@/services'),
              ]);
              return { Component, loader: favoritesLoader };
            },
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
