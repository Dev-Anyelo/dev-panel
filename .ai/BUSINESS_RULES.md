# Reglas de negocio

## Autenticacion

- El acceso al panel requiere email y password validos.
- La sesion se representa con un JWT firmado y guardado en la cookie HttpOnly `token`.
- Si la sesion no existe o vence, la API responde `401` y la UI redirige a `/login`.

## Usuarios

- Los usuarios viven en PostgreSQL; no hay fuente alterna en JSON.
- Cada usuario tiene `role` y `status`.
- El listado de usuarios nunca debe incluir el campo `password`.
- La busqueda debe consultar por `name` o `email`.
- Los filtros validos hoy son:
  - Rol: `ADMIN`, `USER`, `MODERATOR`
  - Estado: `ACTIVE`, `INACTIVE`, `SUSPENDED`

## Dashboard

- Debe mostrar metricas reales calculadas desde la base de datos.
- La actividad reciente se basa en los ultimos usuarios por fecha de creacion.

## Experiencia de sesion

- Login exitoso: el cliente guarda el usuario en contexto y navega a `/dashboard`.
- Logout: se borra la cookie y el usuario vuelve a `/login`.
- Respuesta `401`: se limpia el contexto local y se muestra feedback visual.

## Restricciones funcionales actuales

- No existe CRUD completo de usuarios.
- No existe recuperacion de contrasena.
- No existe autorizacion diferenciada por rol en la UI o en las rutas protegidas; cualquier usuario autenticado puede ver dashboard y usuarios.

## Validaciones importantes

- `POST /api/auth/login` valida con `zod`.
- `GET /api/users` valida parametros de paginacion y enums.
- `GET /api/stats` y `GET /api/auth/me` requieren sesion valida.

## Casos especiales

- Si la paginacion del cliente apunta a una pagina mayor al total actual, `useUsers` corrige el query param hacia la ultima pagina valida.

## Pendiente por confirmar

- No hay evidencia de reglas de negocio distintas para `ADMIN` vs `USER` vs `MODERATOR` fuera de la visualizacion del dato.
