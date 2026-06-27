# AI-LOG

## Herramientas de IA usadas

- Codex como agente de desarrollo full-stack.
- shadcn/ui CLI para generar componentes fuente.
- Prisma CLI para schema, migracion, generate y seed.

## Eleccion de stack y justificacion

- Next.js App Router permite separar paginas publicas, paginas protegidas y API routes dentro del mismo proyecto.
- Prisma aporta tipado fuerte sobre PostgreSQL/Neon.
- shadcn/ui acelera una interfaz consistente sin construir primitivas visuales desde cero.
- JWT en cookie HttpOnly reduce exposicion del token frente a almacenamiento en `localStorage`.
- Zod valida entradas de API y query params antes de tocar Prisma.

## Prompts representativos

- "Construir desde cero DevPanel con Next.js 14+, Neon DB, Prisma, Tailwind, shadcn/ui, JWT con cookies HttpOnly y Zod."
- "Base zinc oscuro por defecto, seed con admin + minimo 25 usuarios realistas, commits por bloque."
- "Procede directamente con la implementacion completa, sin mockup previo ni mas validaciones."

## Output de IA rechazado o modificado

- La CLI moderna de Next.js genero un `AGENTS.md` indicando que Next 16 renombro middleware a Proxy. En vez de forzar `middleware.ts`, se uso `proxy.ts` para mantener compatibilidad real con Next 16 y `jsonwebtoken`.
- Un intento inicial de smoke test con `curl.exe` fallo por escaping de JSON en PowerShell; se reemplazo por `fetch` desde Node para validar la API sin ruido del shell.
- El componente `sonner` generado dependia de `next-themes`; se modifico a tema `dark` fijo porque DevPanel no requiere toggle de tema.

## Estimacion codigo IA vs propio

- IA: 85%
- Propio/curado durante implementacion: 15%

## Una cosa excelente de la IA

- Mantener el trabajo por bloques verificables con commits, tests, build y smoke tests reales redujo ambiguedad y facilito auditar el resultado.

## Una cosa mala de la IA

- Las herramientas generativas pueden asumir APIs inestables; el test inicial con `unstable_doesProxyMatch` tuvo que reemplazarse por una prueba mas simple y estable.
