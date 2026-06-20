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
            path: 'book/:eventId',
            id: 'book-event',
            hydrateFallbackElement: <FallbackPage message="Loading book event form..." />,
            lazy: async () => {
              const [{ default: Component }, { bookingLoader }] = await Promise.all([
                import('@/pages/BookEvent'),
                import('@/services'),
              ]);
              return { Component, loader: bookingLoader };
            },
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
          {
            path: 'create-event',
            id: 'create-event',
            hydrateFallbackElement: <FallbackPage message="Creating event..." />,
            lazy: () =>
              import('@/pages/CreateEvent').then(module => ({ Component: module.default })),
            ...routeErrorBoundary,
          },
          {
            path: 'profile',
            id: 'profile',
            hydrateFallbackElement: <FallbackPage message="Loading profile..." />,
            lazy: async () => {
              const [{ default: Component }, { profileLoader }] = await Promise.all([
                import('@/pages/Profile'),
                import('@/services'),
              ]);
              return { Component, loader: profileLoader };
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
