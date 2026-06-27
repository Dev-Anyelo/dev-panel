# Guia de desarrollo

## Requisitos

- Node.js 18+
- npm
- acceso a la base definida en `DATABASE_URL`

## Variables de entorno

Requeridas en `.env`:

- `DATABASE_URL`
- `JWT_SECRET`
- `NEXTAUTH_URL`

La plantilla sin valores reales vive en `.env.example`.

## Instalacion local

```bash
git clone https://github.com/Dev-Anyelo/devpanel-anyelo.git
cd dev-panel
npm install
```

## Puesta en marcha

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

## Comandos utiles

```bash
npm run dev
npm run lint
npm run test
npx tsc --noEmit
npm run build
npx prisma studio
```

## Migraciones y schema

- Cambios de schema: editar `prisma/schema.prisma`
- Desarrollo con migracion nueva:

```bash
npx prisma migrate dev --name nombre-del-cambio
```

- Produccion o entorno alineado:

```bash
npx prisma migrate deploy
```

## Convenciones del proyecto

- Preferir TypeScript estricto.
- No usar `any` sin necesidad real.
- No escribir componentes UI base si ya existe una pieza equivalente en shadcn/ui.
- Mantener paginas pequenas y mover logica a hooks o componentes.

## Checklist antes de entregar cambios

1. Revisar si el cambio afecta auth, Prisma o `proxy.ts`.
2. Actualizar docs si cambia arquitectura, API, permisos o setup.
3. Ejecutar:
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build`
4. Verificar manualmente la ruta afectada si el cambio es de UI o interaccion.

## Pendiente por confirmar

- No hay convencion explicita de ramas en el repo.
- La politica exacta de versionado y releases no esta documentada.
