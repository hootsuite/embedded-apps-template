# Hootsuite Embedded App Template

A template for building embedded applications that run inside the Hootsuite dashboard.

## Overview

This template provides everything you need to build a Hootsuite embedded app:

- **React + TypeScript** frontend with modern tooling
- **Webpack** configured to output a single `app.js` file for submission
- **Development server** with hot reload

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:

```bash
nvm install
nvm use
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

This will also create a `.env` file from `.env.example` if one doesn't exist.

### 2. Configure your app

Edit the `.env` file with your Hootsuite app credentials:

```env
HOOTSUITE_APP_ID=your-app-id
FRONTEND_PORT=8080
BACKEND_PORT=3001
BACKEND_HOST=http://localhost:3001
HMR_ENABLED=TRUE
```

### 3. Start development server

```bash
npm start
```

- **Frontend**: http://localhost:8080

### 4. Build for production

```bash
npm run build
```

This creates a single `dist/app.js` file ready for submission to Hootsuite.

## Project Structure

```
├── src/                      # Frontend React application
│   ├── index.tsx            # Entry point
│   ├── App.tsx              # Main App component
│   ├── components/          # React components
│   └── styles/              # CSS styles
│
├── scripts/                  # Build and dev scripts
│   ├── start.ts             # Development server orchestrator
│   └── copy_env.ts          # Environment file setup
│
├── public/                   # Static files
│   └── index.html           # HTML template
│
├── dist/                     # Build output (generated)
│   └── app.js               # Production bundle
│
├── webpack.config.ts         # Webpack configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables example
└── README.md                # This file
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development servers (frontend + server) |
| `npm run build` | Build production bundle (`dist/app.js`) |
| `npm run build:dev` | Build development bundle with source maps |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run lint:types` | Type-check with TypeScript |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run storybook` | Open Storybook |

## Hootsuite Context

The dashboard loads your app in an iframe and exchanges data through a small bridge implemented in `src/context/AppConnector.ts`. **You do not need to change `AppConnector` for normal app development.** It wires up `postMessage` events for auth and context; treat it as platform infrastructure.

Use **`useHootsuite()`** (from `src/context/useHootsuite.tsx`) anywhere under `HootsuiteContextProvider` to read and react to:

- **Lifecycle:** `isAppReady` becomes true after the host responds to the initial handshake; wait for this before assuming the bridge works.
- **Auth:** `isAuthenticated`, `accessToken`, `isAuthorizing`, `requestAuthorization`, and `appError`.
- **Host data:** `appContext` (shape depends on where the app is embedded), `currentLocale`, and **`surface`** (from the `surface` query parameter on your app URL).

**Context shape by surface:** `appContext` is typed based on surface, and this template demonstrates support for multiple surfaces. If you only need to support one surface, you can narrow the types in `AppContext.tsx`.

## Entrypoint

`src/components/pages/Entrypoint.tsx` is the first route under `/`. It runs after the provider has started the handshake: when **`isAppReady`** is true, the template checks **`isAuthenticated`** and redirects to `/authorize` or `/home`. Use this pattern as a gate—fetch data, validate tokens, or inspect `appContext` only after `isAppReady`, then send users to the right child route. The route tree is defined in `src/routes/routes.tsx`; `Entrypoint` renders an `<Outlet />` for nested routes. You are free to do whatever you choose here; the template is only an example.

## Adding features

1. **Add a path** in the `Paths` enum in `src/routes/routes.tsx`.
2. **Register a route** in the `children` array: point `path` at your enum value and `element` at your page (wrap with `ProtectedRoute` if the page requires a Hootsuite access token).
3. **Implement the page** under `src/components/pages/` (or split UI into `src/components/`). Import shared UI from **`hootsuite-bento`** where possible so the app matches Hootsuite patterns.

Use `useHootsuite()` in pages or hooks for auth and context; keep routing concerns in the router and leave `AppConnector` unchanged except in rare cases.

## Authentication

Configure your app’s **OAuth client ID and secret** (and allowed redirect URLs) in the **Hootsuite Developer Portal** for the same app ID you set in `.env` as `HOOTSUITE_APP_ID`. The host completes the OAuth flow with the user; your iframe receives tokens through the connector.

From React code, call **`requestAuthorization()`** from `useHootsuite()` when the user must sign in (see `src/components/pages/Authorize.tsx`). While the host runs the flow, **`isAuthorizing`** reflects in-progress state; **`appError`** is set if the host reports an authorization error. After success, **`isAuthenticated`** and **`accessToken`** are available for API calls or `ProtectedRoute`-guarded screens.

## Storybook

Run **`npm run storybook`** to open Storybook (default port **6006**). It documents the **Bento** design system components shipped with this template via the **`hootsuite-bento`** package. Browse stories for usage, variants, and accessibility notes; your editor gets TypeScript types from the same package when you import components in app code.