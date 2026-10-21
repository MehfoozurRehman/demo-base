# zood-web

A Next.js App Router scaffold with Prisma (MongoDB provider), Jotai, SWR and small server-action and data hooks. The app itself is a placeholder.

**Status:** Starter. The project wires up the framework, database client and client-side helpers, but the home page only renders "Home", the one server action returns a fixed result, and the Prisma schema defines no models.

## The problem

The code shows a foundation for a web app with a database behind it, not a specific product. It is a starting point for a full-stack Next.js project.

## What it does

- Renders a placeholder home page (`app/page.tsx`).
- Provides an example server action, `example`, in `actions.ts`, which returns a fixed "ok" status.
- Provides client hooks `useGetAction` and `usePostAction` in `hooks/` for calling server actions.
- Sets up a Jotai provider in `providers/Jotai.tsx` and a Prisma client in `lib/prisma.ts`.

## How it's built

- Next.js with the App Router and Turbopack for development.
- Prisma with a `mongodb` datasource in `prisma/schema.prisma`, and a generated client.
- Jotai for shared client state, SWR for data fetching, and `nuqs` for URL query state.
- Server actions in `actions.ts` are the intended entry point for data mutations.

## Running it locally

```bash
pnpm install       # or npm install
pnpm db:generate   # prisma generate
pnpm dev           # next dev --turbopack
```

Prisma needs a database connection configured in the environment before it can connect. The repo does not include a sample environment file.

## What's left

- The Prisma schema has no models, so nothing is stored yet.
- The home page is a placeholder.
- The `example` server action does not touch the database or validate input.
- There are no tests.
- The original create-next-app README was replaced with this file.
