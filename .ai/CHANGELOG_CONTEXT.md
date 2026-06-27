# Contexto de cambios relevantes

## Cambios confirmados por historial reciente

- `8774cfa` `feat: add jwt auth api`
  - Se agregaron APIs de autenticacion basadas en JWT.
- `d64d12a` `feat: add protected users and stats api`
  - Se agregaron endpoints protegidos para usuarios y metricas.
- `4814c78` `feat: build devpanel interface`
  - Se construyo la primera version visible del panel.
- `7fd76d3` `docs: add project handoff notes`
  - Se introdujo documentacion de handoff inicial.
- `373a83a` `fix: verify debounce, complete README and AI-LOG`
  - Se ajusto la verificacion de debounce y documentacion obligatoria.
- `ce768c9` `feat: complete UI/UX redesign with brand system, DataTable and Sheet`
  - Se rediseño la experiencia visual y la tabla de usuarios.
- `12331f1` `fix: apply brand tokens correctly, redesign login split-panel, add nuqs URL persistence`
  - Se corrigieron tokens visuales, login split-panel y persistencia de filtros en URL.
- `684fcd5` `refactor: clean architecture, fix brand tokens, improve UI/UX`
  - Se reorganizo el codigo en `src/` y por dominios.

## Decisiones tecnicas relevantes

- Se uso `proxy.ts` en vez de `middleware.ts` por la convencion de Next.js 16.
- La persistencia de filtros de usuarios se resolvio con `nuqs`.
- El tema visual depende de tokens semanticos centralizados en `src/app/globals.css`.
- La autenticacion cliente depende de `AuthProvider` y no de una libreria externa de sesiones.

## Reglas que cambiaron con el tiempo

- La UI paso de una estructura mas simple a una arquitectura por modulos (`auth`, `dashboard`, `users`, `layout`).
- La persistencia local de filtros fue reemplazada por query params en la URL.

## Pendiente por documentar

- No hay evidencia en el historial local de por que se eligio `radix-nova` en `components.json`.
- No hay changelog funcional por release; solo commits descriptivos.
