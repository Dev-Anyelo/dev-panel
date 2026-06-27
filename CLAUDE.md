# DevPanel Agent Context

DevPanel is a single Next.js App Router project for a mini admin panel.

## Stack

- Next.js 16+ App Router with TypeScript strict mode.
- Tailwind CSS v4 and shadcn/ui with a dark zinc theme by default.
- Prisma + Neon PostgreSQL.
- JWT sessions signed with `jsonwebtoken` and stored in an HttpOnly `token` cookie.
- Zod for API validation.

## Architecture

- Public auth routes: `app/(auth)/`.
- Protected pages: `app/(protected)/`.
- API routes: `app/api/`.
- Route protection: `proxy.ts` in the project root. Next.js 16 renamed `middleware.ts` to `proxy.ts`.
- Shared Prisma client: `lib/prisma.ts`.
- Shared JWT helpers: `lib/auth.ts`.
- Client auth state: `components/providers/auth-provider.tsx`.

## Quality Rules

- Keep API errors shaped as `{ error: string }`.
- Never return `password` from API responses.
- Prefer shadcn/ui components before custom UI.
- Keep credentials in environment variables only.
- Run `npm run lint`, `npm run test`, `npx tsc --noEmit`, and `npm run build` before final handoff.
