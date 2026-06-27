# DevPanel Agent Context

Consulta `AGENTS.md` y la carpeta `.ai/` antes de modificar el proyecto.

## Resumen rapido

- Proyecto: DevPanel
- Tipo: mini panel administrativo con login, dashboard y directorio de usuarios
- Stack: Next.js 16, TypeScript, Tailwind v4, shadcn/ui, Prisma, Neon PostgreSQL, JWT, Zod, nuqs, Sonner

## Rutas y estructura real

- Publico: `src/app/(auth)/login`
- Protegido: `src/app/(protected)/dashboard`
- APIs: `src/app/api`
- Layout raiz: `src/app/layout.tsx`
- Layout protegido: `src/components/layout/protected-layout.tsx`
- Proteccion de rutas: `proxy.ts`

## Puntos criticos

- Auth cliente: `src/components/providers/auth-provider.tsx`
- JWT y cookies: `src/lib/auth.ts`
- Usuarios: `src/hooks/use-users.ts`, `src/app/api/users/route.ts`
- Dashboard: `src/hooks/use-dashboard.ts`, `src/app/api/stats/route.ts`
- Tokens visuales: `src/app/globals.css`

## Reglas de calidad

- Mantener errores de API como `{ error: string }`.
- No retornar `password`.
- No introducir datos mock fuera de Prisma/seed.
- Validar con `npm run lint`, `npx tsc --noEmit` y `npm run build`.
