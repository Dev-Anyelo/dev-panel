# Contexto del proyecto

## Que es DevPanel

`DevPanel` es un mini panel de administracion enfocado en autenticacion por email y password, dashboard operativo y directorio de usuarios con filtros, busqueda y paginacion.

## Problema que resuelve

Provee una base funcional para administrar y visualizar usuarios desde una interfaz protegida, sin depender de mocks locales ni archivos JSON. Toda la informacion sale de PostgreSQL via Prisma.

## Usuarios principales

- Operador autenticado que necesita entrar al panel y revisar metricas.
- Usuario interno que consulta usuarios registrados, su rol, estado y fecha de creacion.

## Modulos principales

- Login y sesion JWT en cookie HttpOnly.
- Dashboard con metricas agregadas.
- Directorio de usuarios con busqueda, filtros, paginacion y detalle lateral.
- Documentacion tecnica y contexto para agentes.

## Flujo general de la aplicacion

1. La persona entra a `/login`.
2. `POST /api/auth/login` valida credenciales contra Prisma y devuelve cookie `token`.
3. `proxy.ts` protege `/dashboard`, `/api/users` y `/api/stats`.
4. `AuthProvider` confirma la sesion con `GET /api/auth/me`.
5. Desde `/dashboard`, el cliente consulta metricas y actividad reciente.
6. Desde `/dashboard/users`, el cliente consulta usuarios con filtros persistidos en la URL mediante `nuqs`.

## Contexto empresarial relevante

- El proyecto parece pensado como prueba tecnica o base interna de panel administrativo.
- El dominio actual es gestion de usuarios; no hay modulos de ventas, inventario ni CRUD completo.

## Pendiente por confirmar

- No hay evidencia en el codigo de permisos diferenciados por rol a nivel de negocio.
- No hay evidencia de integraciones externas aparte de Neon/PostgreSQL.
