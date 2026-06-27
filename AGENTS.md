# DevPanel

Mini panel de administracion construido con Next.js App Router, Prisma, Neon PostgreSQL y shadcn/ui.

## Punto de entrada para agentes de IA

Antes de modificar codigo, lee estos archivos en este orden:

1. `.ai/AGENTS.md`
2. `.ai/PROJECT_CONTEXT.md`
3. `.ai/ARCHITECTURE.md`
4. `.ai/BUSINESS_RULES.md`
5. `.ai/API_GUIDE.md`
6. `.ai/UI_GUIDE.md`
7. `.ai/PERMISSIONS.md`
8. `.ai/DEVELOPMENT_GUIDE.md`

## Reglas generales

- No asumas reglas de negocio que no esten confirmadas en el codigo.
- Mantiene los errores de API con forma `{ error: string }`.
- No expongas `password` ni otros datos sensibles en respuestas o logs.
- Antes de tocar auth, permisos, Prisma, `proxy.ts` o la UI compartida, revisa la guia especifica dentro de `.ai/`.
- Valida cambios con `npm run lint`, `npx tsc --noEmit` y `npm run build` antes de cerrar una tarea importante.

## Referencias

- Guia principal para agentes: `.ai/AGENTS.md`
- Contexto del proyecto: `.ai/PROJECT_CONTEXT.md`
- Arquitectura y modulos: `.ai/ARCHITECTURE.md`, `.ai/MODULES.md`
- Base de datos y API: `.ai/DATABASE.md`, `.ai/API_GUIDE.md`
- UI, permisos y desarrollo: `.ai/UI_GUIDE.md`, `.ai/PERMISSIONS.md`, `.ai/DEVELOPMENT_GUIDE.md`
