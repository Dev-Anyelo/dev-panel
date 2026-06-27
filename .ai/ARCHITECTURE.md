# Arquitectura

## Stack tecnologico

- Next.js 16 App Router
- React 19
- TypeScript estricto
- Tailwind CSS v4
- shadcn/ui
- Prisma
- PostgreSQL serverless en Neon
- `jsonwebtoken`
- `bcryptjs`
- `zod`
- `nuqs`
- `sonner`

## Estructura principal

```txt
src/
  app/
    (auth)/login/
    (protected)/dashboard/
    api/
  components/
    auth/
    dashboard/
    layout/
    providers/
    ui/
    users/
  hooks/
  lib/
  types/
prisma/
proxy.ts
README.md
.ai/
```

## Arquitectura general

- `src/app/` contiene paginas y API routes.
- `src/components/` separa piezas visuales por dominio.
- `src/hooks/` contiene la logica cliente de fetch y sincronizacion de estado.
- `src/lib/` encapsula autenticacion JWT, Prisma y helpers genericos.
- `src/types/` define contratos compartidos.
- `prisma/` concentra schema, migraciones y seed.

## Patrones usados

- Paginas `page.tsx` pequenas que delegan a componentes.
- Layout protegido extraido a `src/components/layout/protected-layout.tsx`.
- Estado global de sesion con contexto React.
- Fetch cliente con hooks dedicados (`useDashboard`, `useUsers`).
- Persistencia de filtros de usuarios en query string con `nuqs`.
- Tokens visuales centralizados en `src/app/globals.css`.

## Flujo de informacion

1. El layout raiz configura fonts, `NuqsAdapter`, `Toaster` y providers.
2. `AuthProvider` consulta `/api/auth/me` al montar.
3. El cliente renderiza el layout protegido solo si hay sesion valida.
4. `useDashboard` y `useUsers` consumen APIs internas protegidas.
5. Las API routes usan Prisma para leer datos y `lib/auth.ts` para validar JWT.
6. `proxy.ts` intercepta acceso a paginas y APIs protegidas antes del render.

## Separacion frontend y backend

### Frontend

- `src/app/(auth)/login/page.tsx`
- `src/app/(protected)/dashboard/page.tsx`
- `src/app/(protected)/dashboard/users/page.tsx`
- `src/components/**`
- `src/hooks/**`

### Backend

- `src/app/api/**`
- `src/lib/auth.ts`
- `src/lib/prisma.ts`
- `prisma/schema.prisma`

## Consideraciones importantes

- En este proyecto la proteccion de rutas usa `proxy.ts`, no `middleware.ts`, por convencion de Next.js 16.
- El backend nunca debe retornar `password`.
- La UI depende de tokens semanticos, no de colores hardcodeados, para mantener consistencia dark-first.
