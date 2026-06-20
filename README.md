# Ctrl Alt Meet

Ctrl Alt Meet is a React event management platform for browsing conferences, favoriting events, booking tickets, managing reservations, and updating your user profile. It uses a local JSON API during development (json-server) and Vercel serverless handlers in production. Built with TypeScript, Vite, Redux Toolkit, React Hook Form, and Tailwind CSS.

## Tech stack

- **React 19** with TypeScript
- **Vite** for dev server and builds
- **React Router** for client-side routing
- **Redux Toolkit** for global state (events, bookings, favorites, speakers, categories)
- **React Context** for theme and authentication
- **React Hook Form** + **Zod** for form validation
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible dialogs
- **Sonner** for toast notifications
- **Lucide React** for icons
- **json-server** for local mock API
- **Upstash Redis** for persistent production data (via Vercel Marketplace)
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

| Variable                   | Development             | Production (Vercel)                     |
| -------------------------- | ----------------------- | --------------------------------------- |
| `VITE_API_BASE_URL`        | `http://localhost:3001` | `/api`                                  |
| `UPSTASH_REDIS_REST_URL`   | —                       | Auto-provisioned by Upstash integration |
| `UPSTASH_REDIS_REST_TOKEN` | —                       | Auto-provisioned by Upstash integration |

The app reads API requests from `VITE_API_BASE_URL`. In development, this points to json-server. In production, requests go through the `/api` serverless handlers defined in the `api/` folder.

Production writes (favorites, bookings, ticket purchases) are stored in **Upstash Redis**. If Redis is not configured, the API falls back to in-memory data seeded from `db.json` — reads work, but writes may not persist across redeploys.

### Install and run locally

```bash
npm install
npm run dev:all
```

The app starts at `http://localhost:5173` and the JSON API runs at `http://localhost:3001`.

If you only need the frontend:

```bash
npm run dev
```

If you only need the mock API:

```bash
npm run server
```

> **Note:** If you add a new collection to `db.json` (e.g. `favorites`), restart json-server so it registers the new routes.

### Other scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite dev server                |
| `npm run server`       | Start the JSON server API                |
| `npm run dev:all`      | Start the app and JSON server together   |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Run ESLint                               |
| `npm run prettier`     | Format source files with Prettier        |
| `npm run check-format` | Check formatting without writing changes |

## Features

### Events

- Card-based event listing with search, category filters, date range filters (Upcoming, This Week, This Month, etc.), dual-thumb price range slider, and sorting (date, price, popularity)
- Pagination with empty, loading, and error states
- Event detail pages with description, date, time, location, organizer, ticket tiers, venue info, speakers, and highlights
- Favorite (star) button on event cards and event details hero (logged-in users)

### Authentication

- Unified login/register page at `/login` (email, password, name)
- Existing users: password check; new users: auto-created via json-server
- `AuthProvider` persists session in `localStorage`
- Soft route guards: My Bookings, Registration, Favorites, Profile, and Book Tickets require login; guests are redirected to `/login` and returned after sign-in
- Signed-in users see their avatar and name on the login page with a logout option
- Header avatar links to `/profile` when authenticated

### Favorites

- Per-user favorites stored in the `favorites` collection (not global `event.isFavorite` flags)
- Toggle favorites from event cards and event details
- Dedicated Favorites page with compact event grid and empty state

### Ticket booking

- 3-step book event flow: Select Tickets → Attendee Details → Confirmation
- Real-time price calculation, Zod validation, progress indicator, back/next navigation
- Booking reference generated on confirm; success toast with reference; redirects to My Bookings
- Ticket availability updated on the event via PATCH

### My Bookings

- User-scoped bookings (`GET /bookings?userId=`)
- Upcoming and Past Events tabs
- Ticket details dialog (tier, quantity, total, schedule, attendees)
- Cancel upcoming bookings via two-step confirmation dialog with success/error toasts

### Profile

- Profile page at `/profile` (auth required) with route loader for current user data
- Edit display name, profile photo (image URL with initials fallback), and optional about me (max 500 characters)
- Manage notification preferences: email notifications, event reminders, and preferred event category
- `useProfileUpdate` hook syncs updates with the API, auth context, and toast feedback
- Shared `UserAvatar` component for profile image or initials across profile, login, and headers
- Log out directly from the profile page

### Speakers

- Speaker listing page with profile cards
- Speakers linked from event detail pages

### UI and UX

- Light and dark theme toggle with `localStorage` persistence
- Responsive desktop header + mobile bottom navigation
- Loading, error, and empty states across pages
- Toast notifications for booking, cancellation, favorites, profile updates, and auth actions

## Routes

| Path            | Page             | Auth     |
| --------------- | ---------------- | -------- |
| `/`             | Events           | Open     |
| `/events/:id`   | Event details    | Open     |
| `/speakers`     | Speakers         | Open     |
| `/login`        | Login / Register | Open     |
| `/favorites`    | Favorites        | Required |
| `/my-bookings`  | My Bookings      | Required |
| `/book-event`   | Ticket booking   | Required |
| `/create-event` | Create event     | Required |
| `/profile`      | Profile          | Required |

## Project structure

```
src/
├── appearance/     # Theme tokens, CSS variables, light/dark themes
├── context/        # ThemeProvider, AuthProvider
├── features/       # Feature modules (auth, events, favorites, bookings, book-event, profile, speakers)
├── hooks/          # useAuth, useAuthForm, useProfileUpdate, useRegistrationForm, useTheme, useMediaQuery
├── layouts/        # MainLayout, desktop/mobile headers, footers, nav
├── lib/            # Utility helpers (e.g. cn)
├── pages/          # Route-level page components
├── schemas/        # Zod schemas (auth, attendee details, profile)
├── services/       # API clients (events, speakers, categories, bookings, users, favorites)
├── shared/         # EmptyState, LoadingState, ErrorState, PassCard, UserAvatar
├── store/          # Redux slices and selectors
├── ui/             # Button, Dialog, Input, Select, Tab, Pagination, SearchBar
└── utils/          # formatDate, buildDateBounds, generateBookingReference, etc.

api/                # Vercel serverless handlers (production API)
├── _db.js          # Shared data layer (Upstash Redis + db.json fallback)
├── events.js
├── bookings.js
├── favorites.js
├── users.js
├── speakers.js
└── categories.js
```

## Data source

Local development uses `json-server` with `db.json`. Production uses serverless handlers in `api/` (rewritten via `vercel.json`), backed by Upstash Redis via `api/_db.js`.

On first request, each collection is seeded from `db.json` into Redis if the key does not exist yet. After that, Redis is the source of truth for writes.

| Resource      | Purpose                                                | Methods           |
| ------------- | ------------------------------------------------------ | ----------------- |
| `/events`     | Event listings, details, ticket tiers, schedules       | GET, PATCH        |
| `/speakers`   | Speaker profiles                                       | GET               |
| `/categories` | Category metadata for filters                          | GET               |
| `/users`      | User accounts for login, register, and profile updates | GET, POST, PATCH  |
| `/bookings`   | User bookings                                          | GET, POST, PATCH  |
| `/favorites`  | Per-user favorite events                               | GET, POST, DELETE |

### Seed users (local demo)

| Email              | Password      | Notes                                                     |
| ------------------ | ------------- | --------------------------------------------------------- |
| `alex@example.com` | (see db.json) | `user-001`, has bookings, favorites, and a sample profile |
| `john@example.com` | (see db.json) | `user-002`                                                |

## Authentication

Auth state is provided by `AuthProvider` and accessed via `useAuth`:

```tsx
import { useAuth } from '@/hooks';

const { user, login, logout, updateUser } = useAuth();
```

`updateUser` keeps the in-memory session in sync after profile edits.

Protected routes use the `RequireAuth` wrapper from `@/features`.

## Theming

The app supports light and dark themes via `ThemeProvider`. The active theme is persisted in `localStorage` and applied as a CSS class on the document root.

```tsx
import { useTheme } from '@/hooks';

const { theme, setTheme, toggleTheme } = useTheme();
```

## Path aliases

Imports use path aliases configured in `vite.config.ts` and `tsconfig.app.json`:

| Alias           | Path               |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@appearance/*` | `src/appearance/*` |
| `@context/*`    | `src/context/*`    |
| `@features/*`   | `src/features/*`   |
| `@hooks/*`      | `src/hooks/*`      |
| `@layouts/*`    | `src/layouts/*`    |
| `@pages/*`      | `src/pages/*`      |
| `@services/*`   | `src/services/*`   |
| `@store/*`      | `src/store/*`      |
| `@ui/*`         | `src/ui/*`         |
| `@utils/*`      | `src/utils/*`      |

Import from barrel paths where available (e.g. `@/features`, `@/hooks`, `@/context`) rather than deep subpaths.

## Build and deployment

Run the production build locally:

```bash
npm run build
```

The build script runs TypeScript first, then Vite:

```bash
tsc -b && vite build
```

### Deploy to Vercel

1. Push the repo to GitHub and import the project in Vercel.
2. Add **Upstash Redis** from Vercel **Storage** (Marketplace). Attach it to the project — this auto-injects `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
3. Set the frontend env var in **Project → Settings → Environment Variables**:

   ```bash
   VITE_API_BASE_URL=/api
   ```

   Apply it to **Production** (and Preview if you want preview deployments to work).

4. Redeploy. The `vercel.json` rewrites route API calls to the serverless handlers in `api/`.

### Verify after deploy

- Events page loads (`GET /api/events`)
- Star an event → star fills immediately (`POST /api/favorites`)
- Purchase a ticket → no console errors, booking appears on My Bookings (`POST /api/bookings`, `PATCH /api/events/:id`)
- Refresh the page → favorites and bookings still there (Redis persistence)
- Update profile name or photo on `/profile` → changes persist and reflect in the header (`PATCH /api/users/:id`)

## Status

Core platform features are implemented: events discovery, authentication, favorites, ticket booking, my bookings with cancellation, user profile management, speakers, theming, and responsive layouts. The app uses json-server locally and Vercel serverless handlers with Upstash Redis in production.
