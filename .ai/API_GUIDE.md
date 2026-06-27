# Guia de APIs

## Estructura

Las APIs viven en `src/app/api/` y usan Route Handlers de Next.js.

## Convenciones generales

- Runtime: `nodejs` en endpoints que usan Prisma o `jsonwebtoken`.
- Error esperado: `{ error: string }`
- Autenticacion: cookie HttpOnly `token`
- Nunca retornar `password`

## Endpoints principales

### `POST /api/auth/login`

- Entrada:
  - `email`
  - `password`
- Valida con `zod`
- Busca usuario en Prisma
- Compara password con `bcryptjs`
- Si es valido:
  - firma JWT con `userId`, `email`, `role`
  - guarda cookie `token`
  - devuelve `user`
- Errores:
  - `400` datos invalidos
  - `401` credenciales invalidas

### `POST /api/auth/logout`

- Borra la cookie `token`
- Devuelve confirmacion simple

### `GET /api/auth/me`

- Requiere cookie `token`
- Verifica JWT
- Busca usuario actual en Prisma
- Devuelve `user`
- Errores:
  - `401` si no hay sesion, token invalido o usuario inexistente

### `GET /api/users`

- Requiere cookie valida
- Query params soportados:
  - `search`
  - `page`
  - `limit`
  - `role`
  - `status`
- Busca por `name` o `email`
- Ordena por `createdAt desc`
- Devuelve:
  - `users`
  - `total`
  - `page`
  - `totalPages`

### `GET /api/stats`

- Requiere cookie valida
- Devuelve:
  - `totalUsers`
  - `activeUsers`
  - `adminUsers`
  - `newUsersThisMonth`

## Reglas de autenticacion y autorizacion

- La autenticacion se resuelve con JWT y cookie HttpOnly.
- `proxy.ts` protege acceso a paginas y APIs sensibles.
- Actualmente no hay autorizacion por rol.

## Manejo de errores en cliente

- `AuthProvider` redirige a `/login` si `/api/auth/me` o endpoints protegidos responden `401`.
- Los hooks cliente muestran toast de error para fallos de red.

## Recomendaciones para nuevos endpoints

1. Ubicarlos en `src/app/api/`.
2. Mantener validacion de entrada con `zod`.
3. Reutilizar `AUTH_COOKIE_NAME` y `verifyAuthToken` si son protegidos.
4. Respetar contratos tipados en `src/types/`.
5. Evitar respuestas ambiguas o formas distintas de error.
