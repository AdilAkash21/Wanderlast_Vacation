# Wanderlast

Wanderlast is a responsive travel experience application built with Next.js. It
provides destination discovery, destination management, booking flows, account
authentication, responsive navigation, and persistent light/dark mode.

## Requirements

- Node.js compatible with Next.js 16
- npm
- MongoDB for authentication, destinations, and bookings

## Getting started

Install dependencies:

```bash
npm ci
```

Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=wanderlast
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` may also be added when Google
sign-in is configured. Do not commit `.env.local` or any other file containing
secrets.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |
| `npm audit --omit=dev` | Check production dependency vulnerabilities |

## Application routes

### Pages

- `/` — Home page and featured travel call-to-action
- `/destinations` — Protected destination listing
- `/destinations/[id]` — Destination details and booking actions
- `/add-destination` — Protected destination creation
- `/my-bookings` — Protected user bookings
- `/profile` — Account profile
- `/login` — Sign in
- `/signup` — Create an account

### API routes

- `/api/auth/[...all]` — Better Auth handlers
- `/api/destination` — List and create destinations
- `/api/destination/[id]` — Read, update, and delete a destination
- `/api/booking` — Create bookings
- `/api/booking/[id]` — Read and delete bookings

Authentication is required for destination mutations and booking operations.
The destination and booking routes require a working MongoDB connection.

## Features

- Wanderlast branding throughout the application
- Responsive desktop and mobile navigation
- Active navigation states and protected routes
- Light/dark theme toggle fixed in the lower-right corner
- Theme preference persisted in local storage
- White logo in light mode and black logo in dark mode
- True-black dark-mode page and footer backgrounds
- MongoDB-backed Better Auth sessions
- Responsive destination cards, forms, and booking views

## Project structure

```text
src/
├── app/              Next.js pages and API route handlers
├── components/       Shared, homepage, auth, destination, and booking UI
├── lib/              Authentication, database, and API helpers
└── proxy.js          Protected-route session checks
public/               Static assets, including the Wanderlast logo
```

## Configuration notes

Without `MONGODB_URI` and `BETTER_AUTH_SECRET`, the public UI can still be
built and viewed, but authentication, destinations, and bookings will return
configuration errors. Start MongoDB and configure the environment variables
before testing those features.

The project currently uses Next.js `16.3.5`. Run `npm audit --omit=dev`
regularly and review dependency updates before deploying.

## Deployment

Create a production build and start it with:

```bash
npm run build
npm run start
```

Set production values for all required environment variables in the deployment
platform. Use a strong, unique `BETTER_AUTH_SECRET` and restrict MongoDB access
to the application environment.
