# Guia principal para agentes de IA

## Objetivo

Esta carpeta documenta el proyecto `DevPanel` para que cualquier IA o desarrollador pueda entender rapido la aplicacion antes de implementar cambios, corregir bugs o revisar seguridad.

## Orden de lectura recomendado

1. `PROJECT_CONTEXT.md`
2. `ARCHITECTURE.md`
3. `BUSINESS_RULES.md`
4. `MODULES.md`
5. `DATABASE.md`
6. `API_GUIDE.md`
7. `UI_GUIDE.md`
8. `PERMISSIONS.md`
9. `DEVELOPMENT_GUIDE.md`
10. `CHANGELOG_CONTEXT.md`
11. `PROMPTS.md`

## Como debe trabajar una IA dentro del proyecto

1. Leer el contexto antes de proponer cambios amplios.
2. Confirmar primero si el cambio afecta autenticacion, Prisma, rutas protegidas, filtros de usuarios o tokens visuales.
3. Mantener la separacion actual:
   - `src/app/` para paginas y API routes.
   - `src/components/` para UI y layouts.
   - `src/hooks/` para estado cliente y fetch.
   - `src/lib/` para utilidades compartidas.
   - `src/types/` para contratos tipados.
4. Preferir cambios pequenos y enfocados.
5. No introducir nuevas librerias si el stack actual ya resuelve el problema.

## Archivos que se deben revisar antes de ciertos cambios

### Si el cambio toca autenticacion o sesiones

- `src/lib/auth.ts`
- `src/components/providers/auth-provider.tsx`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/me/route.ts`
- `src/app/api/auth/logout/route.ts`
- `proxy.ts`

### Si el cambio toca usuarios, filtros o paginacion

- `src/hooks/use-users.ts`
- `src/app/api/users/route.ts`
- `src/components/users/users-toolbar.tsx`
- `src/components/users/users-table.tsx`
- `src/components/users/user-detail-sheet.tsx`

### Si el cambio toca dashboard

- `src/hooks/use-dashboard.ts`
- `src/app/api/stats/route.ts`
- `src/components/dashboard/`

### Si el cambio toca UI compartida

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/ui/`
- `src/components/layout/`

## Como analizar una tarea

1. Identificar si es cambio funcional, visual, de datos o de documentacion.
2. Trazar que API, hook, componente y tipo estan involucrados.
3. Revisar si existe riesgo de romper:
   - cookies HttpOnly
   - verificacion JWT
   - `proxy.ts`
   - respuesta `{ error: string }`
   - exclusiones de `password`
   - persistencia en URL con `nuqs`
4. Verificar que la pagina final siga siendo usable en mobile y desktop.

## Como proponer cambios

- Explicar primero el impacto en archivos y comportamiento.
- Mantener los nombres y patrones ya existentes.
- Si hay incertidumbre, agregar una seccion `Pendiente por confirmar` en vez de inventar reglas.

## Antes de tocar partes delicadas

### Base de datos

- Revisar `prisma/schema.prisma` y `prisma/seed.ts`.
- Confirmar si el cambio requiere migracion o solo ajuste de seed.

### Permisos y roles

- Revisar `PERMISSIONS.md`.
- Hoy los roles existen en datos, pero la UI no aplica autorizacion por rol.

### APIs

- Mantener respuestas JSON estables.
- No exponer `password`.
- Seguir devolviendo `401` cuando la sesion no es valida.

### UI

- Usar componentes de `src/components/ui/` y estilos semanticos (`bg-card`, `text-foreground`, `border-border`, etc.).
- Mantener copy en espanol.

## Formato recomendado para entregar implementaciones

1. Resumen breve del cambio.
2. Archivos modificados.
3. Riesgos o supuestos.
4. Validaciones ejecutadas.
5. Pendientes si existe alguna limitacion real.
