import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { NotFoundState } from '@/shared';
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
        lazy: () => import('@/pages/Events').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'events/:id',
        lazy: () => import('@/pages/EventDetails').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'my-bookings',
        lazy: () => import('@/pages/MyBooking').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'speakers',
        lazy: () => import('@/pages/Speakers').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'registration',
        lazy: () => import('@/pages/Registration').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'login',
        lazy: () => import('@/pages/Login').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
      },
      {
        path: 'favorites',
        lazy: () => import('@/pages/Favorites').then(module => ({ Component: module.default })),
        ...routeErrorBoundary,
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
