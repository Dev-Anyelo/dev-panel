# DevPanel

Mini panel de administracion construido con Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma y Neon PostgreSQL. Usa JWT firmado con `jsonwebtoken` en cookie HttpOnly para sesion.

## Prerrequisitos

- Node.js 20.19+ recomendado.
- npm 10+.
- Acceso a la base Neon configurada en `DATABASE_URL`.

## Instalacion y ejecucion

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
DATABASE_URL=""
JWT_SECRET=""
NEXTAUTH_URL=""
```

## Credenciales de prueba

- Email: `admin@devpanel.com`
- Contrasena: `admin123`

## Decisiones tecnicas clave

- Next.js 16 con App Router, manteniendo compatibilidad con el requisito Next.js 14+.
- Rutas protegidas bajo `app/(protected)/` y login bajo `app/(auth)/`.
- Next.js 16 renombro `middleware.ts` a `proxy.ts`; DevPanel usa `proxy.ts` porque corre en runtime Node.js por defecto y permite verificar JWT con `jsonwebtoken`.
- Prisma usa `select` en endpoints publicos internos para no retornar `password`.
- Auth cliente centralizada en `AuthProvider`, con manejo de 401 y redireccion a `/login`.
- shadcn/ui es la base visual: Card, Table, Input, Button, Badge, Avatar, DropdownMenu, Skeleton, Sonner, Dialog, Sheet, Separator, Select y Empty.

## Limitaciones conocidas

- La CLI local mostro warnings porque algunas dependencias recomiendan Node.js 20.19+ y el entorno actual usa Node.js 20.15.0.
- Prisma 6.19 avisa que `package.json#prisma` estara deprecado en Prisma 7; se mantuvo porque fue parte del requerimiento.
- No hay CRUD de usuarios; el alcance implementado cubre login, sesion, metricas, busqueda, filtros y paginacion.
