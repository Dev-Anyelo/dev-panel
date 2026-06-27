# Modulos del sistema

## 1. Autenticacion

- Proposito: iniciar sesion, persistir la sesion y cerrarla.
- Archivos:
  - `src/app/api/auth/login/route.ts`
  - `src/app/api/auth/me/route.ts`
  - `src/app/api/auth/logout/route.ts`
  - `src/lib/auth.ts`
  - `src/components/providers/auth-provider.tsx`
  - `proxy.ts`
- Funcionalidades:
  - validar credenciales
  - firmar/verificar JWT
  - guardar cookie HttpOnly
  - redirigir cuando la sesion no es valida

## 2. Layout protegido

- Proposito: envolver el panel con sidebar, header y control de sesion.
- Archivos:
  - `src/app/(protected)/layout.tsx`
  - `src/components/layout/protected-layout.tsx`
  - `src/components/layout/app-sidebar.tsx`
  - `src/components/layout/app-header.tsx`
  - `src/components/layout/user-account-menu.tsx`
- Consideraciones:
  - en mobile usa `Sheet`
  - depende de `useAuth`

## 3. Dashboard

- Proposito: mostrar metricas y actividad reciente.
- Archivos:
  - `src/app/(protected)/dashboard/page.tsx`
  - `src/components/dashboard/dashboard-overview.tsx`
  - `src/components/dashboard/metric-card.tsx`
  - `src/components/dashboard/metric-card-skeleton.tsx`
  - `src/components/dashboard/recent-activity.tsx`
  - `src/hooks/use-dashboard.ts`
  - `src/app/api/stats/route.ts`
- Dependencias internas:
  - `useAuth`
  - `StatsResponse`
  - `/api/users?page=1&limit=5` para actividad reciente

## 4. Directorio de usuarios

- Proposito: buscar, filtrar, paginar y revisar usuarios.
- Archivos:
  - `src/app/(protected)/dashboard/users/page.tsx`
  - `src/hooks/use-users.ts`
  - `src/components/users/users-toolbar.tsx`
  - `src/components/users/users-table.tsx`
  - `src/components/users/users-table-skeleton.tsx`
  - `src/components/users/user-detail-sheet.tsx`
  - `src/components/users/role-badge.tsx`
  - `src/components/users/status-badge.tsx`
  - `src/app/api/users/route.ts`
- Funcionalidades:
  - persistencia de filtros en URL
  - detalle lateral
  - paginacion
  - estado vacio y estados de carga

## 5. Sistema UI

- Proposito: mantener consistencia visual.
- Archivos:
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `src/components/ui/**`
- Consideraciones:
  - tipografias con `next/font/google`
  - dark-first con clase `dark` en `<html>`
  - componentes base generados con shadcn/ui

## 6. Datos y seed

- Proposito: definir schema y datos iniciales.
- Archivos:
  - `prisma/schema.prisma`
  - `prisma/seed.ts`
  - `prisma/migrations/**`
- Consideraciones:
  - incluye usuario admin fijo para pruebas
  - hashes con `bcryptjs`
