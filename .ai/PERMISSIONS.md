# Permisos y visibilidad

## Roles existentes

- `ADMIN`
- `USER`
- `MODERATOR`

## Estado actual de permisos

El codigo actual autentica usuarios, pero no implementa autorizacion por rol para restringir pantallas o endpoints. En la practica:

- Cualquier usuario autenticado puede entrar a `/dashboard`.
- Cualquier usuario autenticado puede consultar `/api/users`.
- Cualquier usuario autenticado puede consultar `/api/stats`.

## Reglas de visibilidad

- Visitantes sin sesion:
  - pueden entrar a `/login`
  - no pueden entrar a `/dashboard`
  - no pueden consumir `/api/users` ni `/api/stats`
- Usuarios con sesion valida:
  - son redirigidos desde `/login` hacia `/dashboard`
  - ven sidebar, header, dashboard y tabla de usuarios

## Archivos donde se controlan permisos

- `proxy.ts`
- `src/lib/auth.ts`
- `src/components/providers/auth-provider.tsx`
- `src/app/api/users/route.ts`
- `src/app/api/stats/route.ts`
- `src/app/api/auth/me/route.ts`

## Recomendaciones para no exponer datos sensibles

- Nunca incluir `password` en `select` ni en respuestas JSON.
- Si se agregan mas datos personales, usar `select` explicito en Prisma.
- Mantener el JWT solo en cookie HttpOnly.
- Evitar logs con cookies, tokens o hashes.

## Restricciones por modulo

- Login: publico
- Dashboard: autenticado
- Usuarios: autenticado
- APIs de auth:
  - `login` publico
  - `me` autenticado
  - `logout` autenticado en la practica, aunque responde igual al limpiar cookie

## Pendiente por confirmar

- Si a futuro `ADMIN`, `USER` y `MODERATOR` deben tener permisos distintos, esa regla todavia no esta expresada en el codigo.
