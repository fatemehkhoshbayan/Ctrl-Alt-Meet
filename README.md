# Ctrl Alt Meet

Ctrl Alt Meet is a React event discovery app for browsing conferences, exploring speakers, viewing event details, and managing booked tickets. It uses a local JSON API during development and is built with TypeScript, Vite, Redux Toolkit, and Tailwind CSS.

## Tech stack

- **React 19** with TypeScript
- **Vite** for dev server and builds
- **React Router** for client-side routing
- **Redux Toolkit** for global state management
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **ESLint** and **Prettier** for code quality

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Environment variables

Create a local `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

The app reads API requests from `VITE_API_BASE_URL`. In development, this should point to the local JSON server. In production, set the same variable in your hosting provider.

### Install and run locally

```bash
npm install
npm run dev:all
```

The app starts at `http://localhost:5173` and the JSON API runs at `http://localhost:3001`.

If you only need the frontend, run:

```bash
npm run dev
```

If you only need the mock API, run:

```bash
npm run server
```

### Other scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run server` | Start the JSON server API |
| `npm run dev:all` | Start the app and JSON server together |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run prettier` | Format source files with Prettier |
| `npm run check-format` | Check formatting without writing changes |

## Features

- Browse events with filtering, sorting, pagination, and detail pages.
- Explore speaker profiles with reusable speaker cards.
- View bookings in Upcoming and Past Events tabs.
- Open ticket detail dialogs for booking information.
- Manage responsive layouts with desktop and mobile navigation.
- Switch between light and dark themes with persisted theme preference.

## Routes

| Path | Page |
| --- | --- |
| `/` | Events |
| `/events/:id` | Event details |
| `/my-booking` | My booking |
| `/speakers` | Speakers |

## Project structure

```
src/
├── appearance/     # Theme tokens, CSS variables, and light/dark themes
├── context/        # React context providers (e.g. theme)
├── features/       # Feature-specific modules (events, speakers, bookings)
├── hooks/          # Shared custom hooks
├── layouts/        # App shell and layout components
├── lib/            # Third-party library configuration
├── pages/          # Route-level page components
├── services/       # API fetch functions (events, speakers, categories, bookings)
├── shared/         # Reusable state components (EmptyState, LoadingState, ErrorState)
├── store/          # Redux store, slices, and selectors
├── ui/             # Reusable UI components
└── utils/          # Utility functions
```

## Data source

Local development uses `json-server` with `db.json`. The main resources are:

| Resource | Purpose |
| --- | --- |
| `/events` | Event listings, event details, ticket tiers, schedules |
| `/speakers` | Speaker profiles used by the speakers page and event details |
| `/categories` | Event category metadata and filtering |
| `/bookings` | User booking data for the My Bookings page |

## Theming

The app supports light and dark themes via a `ThemeProvider`. The active theme is persisted in `localStorage` and applied as a CSS class on the document root. Theme tokens live in `src/appearance/themes/` and are exposed as CSS custom properties for use with Tailwind utilities.

Use the `useTheme` hook to read or toggle the current theme:

```tsx
import { useTheme } from '@hooks/useTheme';

const { theme, setTheme, toggleTheme } = useTheme();
```

## Path aliases

Imports use path aliases configured in `vite.config.ts` and `tsconfig.app.json`:

| Alias | Path |
| --- | --- |
| `@/*` | `src/*` |
| `@appearance/*` | `src/appearance/*` |
| `@assets/*` | `src/assets/*` |
| `@context/*` | `src/context/*` |
| `@features/*` | `src/features/*` |
| `@hooks/*` | `src/hooks/*` |
| `@layouts/*` | `src/layouts/*` |
| `@lib/*` | `src/lib/*` |
| `@pages/*` | `src/pages/*` |
| `@services/*` | `src/services/*` |
| `@shared/*` | `src/shared/*` |
| `@store/*` | `src/store/*` |
| `@ui/*` | `src/ui/*` |
| `@utils/*` | `src/utils/*` |

## Build and deployment

Run the production build locally before deploying:

```bash
npm run build
```

The build script runs TypeScript first and then Vite:

```bash
tsc -b && vite build
```

This means deployment can fail before Vite starts if TypeScript finds missing imports, unused values, or invalid types. Make sure `VITE_API_BASE_URL` is configured in the deployment environment.

## Status

The events, speakers, event details, and My Bookings pages are implemented. The app currently uses a JSON server API for data and can be deployed as a Vite static frontend when production API environment variables are configured.
