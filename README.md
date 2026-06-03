# Ctrl Alt Meet

A React app for browsing events, viewing speaker details, and managing bookings. Built with TypeScript, Vite, and Tailwind CSS.

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

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev:all
```

The app starts at `http://localhost:5173` and the JSON API runs at `http://localhost:3001`.

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

- Browse events with filtering, sorting, pagination, and event detail pages.
- Explore speaker profiles with speaker cards and profile details.
- View bookings in dedicated Upcoming and Past Events tabs.
- See booking cards with event imagery, date, location, time, and ticket actions.
- Distinguish completed bookings with a past-event card state and completed action label.

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

## Status

The events page is functional with filtering, sorting, and pagination. The speakers page is live with speaker cards and a hero section. The My Bookings page now loads booking data from the JSON API and displays upcoming and past bookings with tabbed navigation.
