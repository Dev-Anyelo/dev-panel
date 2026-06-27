# Base de datos

## Tecnologia

- Prisma ORM
- PostgreSQL serverless en Neon

## Schema actual

El modelo principal es `User`.

### Campos de `User`

- `id: String`
- `email: String` unico
- `name: String`
- `password: String`
- `role: Role`
- `status: Status`
- `createdAt: DateTime`
- `updatedAt: DateTime`

### Enums

- `Role`: `ADMIN`, `USER`, `MODERATOR`
- `Status`: `ACTIVE`, `INACTIVE`, `SUSPENDED`

## Relaciones importantes

- Actualmente no existen relaciones entre modelos porque solo hay una tabla funcional de negocio.

## Migraciones

- La migracion inicial vive en `prisma/migrations/20260627155835_init/`.
- Si se cambia el schema, debe generarse una nueva migracion y validarse contra el flujo de seed.

## Seed

- Archivo: `prisma/seed.ts`
- Crea 1 admin y al menos 25 usuarios realistas.
- Todas las contrasenas seeded se almacenan hasheadas con `bcryptjs`.

## Consideraciones antes de modificar el schema

1. Revisar impacto en:
   - `src/types/user.ts`
   - `src/types/auth.ts`
   - `src/app/api/**`
   - `src/hooks/**`
   - `prisma/seed.ts`
2. Verificar si el nuevo campo debe aparecer en:
   - dashboard
   - tabla de usuarios
   - payload de login o `/me`

## Riesgos al cambiar modelos existentes

- Romper el login si cambia el campo `password` o `email`.
- Romper filtros si cambian enums `Role` o `Status`.
- Romper seeds o datos existentes si se agregan campos obligatorios sin defaults.

## Pendiente por confirmar

- No hay pruebas automatizadas de migraciones sobre una base temporal separada.
