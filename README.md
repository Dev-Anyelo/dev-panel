# DevPanel

DevPanel es un mini panel de administracion construido con Next.js 14+ App Router, Prisma, Neon DB, Tailwind CSS, shadcn/ui y JWT en cookies HttpOnly.

## Prerrequisitos

- Node 18+.
- npm.
- Acceso a la base Neon usada por `DATABASE_URL`.

## Instalacion y ejecucion

```bash
git clone <URL_DEL_REPO>
cd dev-panel
npm install
```

Crea un archivo `.env` en la raiz del proyecto:

```bash
DATABASE_URL="postgresql://neondb_owner:npg_ZnGvS3LrdUH0@ep-lucky-block-at5w2ad5-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="devpanel_secret_key_2024"
NEXTAUTH_URL="http://localhost:3000"
```

Luego ejecuta:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Abre `http://localhost:3000`.

## Credenciales de prueba

- Email: `admin@devpanel.com`
- Contrasena: `admin123`

## Decisiones tecnicas clave

- Next.js App Router separa paginas publicas, paginas protegidas y API routes dentro del mismo proyecto.
- Prisma + Neon DB entregan PostgreSQL serverless con queries tipadas y migraciones versionadas.
- shadcn/ui + Tailwind CSS permiten una interfaz consistente sin crear primitivas visuales desde cero.
- JWT en cookie HttpOnly evita guardar el token en `localStorage` y permite proteger rutas desde `proxy.ts`.

## Limitaciones conocidas

- No hay CRUD completo de usuarios; solo listado, busqueda, filtros, paginacion y metricas.
- No hay tests E2E automatizados; la verificacion actual cubre unit/smoke tests, TypeScript, lint y build.
- No hay recuperacion de contrasena ni rotacion de secretos JWT.
- No hay roles diferenciados en la UI; todos los usuarios autenticados pueden ver dashboard y tabla.
