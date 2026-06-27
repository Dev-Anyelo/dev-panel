# AI-LOG

## Herramientas de IA usadas

- Codex como agente principal de desarrollo full-stack.
- Claude (`claude.ai`) como referencia solicitada en el contexto del proyecto y formato de handoff.
- shadcn/ui CLI para generar componentes fuente.
- Prisma CLI para schema, migracion, generate y seed.

## Eleccion de stack y justificacion

- Next.js App Router permite tener paginas publicas, paginas protegidas y API routes en un solo proyecto.
- Prisma + Neon DB dan una base PostgreSQL serverless con migraciones versionadas y tipado fuerte.
- Tailwind CSS + shadcn/ui acelera una UI accesible y consistente sin construir componentes desde cero.
- JWT con cookie HttpOnly cumple el requisito de autenticacion simple y evita exponer el token en `localStorage`.
- Zod se uso para validar payloads de login y query params antes de tocar Prisma.

## Prompts representativos

### Prompt 1

Prompt exacto:

> Construir desde cero una aplicacion web llamada DevPanel usando Next.js 14+, Neon DB, Prisma, Tailwind CSS, shadcn/ui, TypeScript estricto, JWT con cookies HttpOnly y Zod.

Que devolvio:

- Una especificacion completa de arquitectura, API routes, middleware/proxy, frontend, seed y documentacion obligatoria.

Que hice con eso:

- Lo implemente como proyecto Next.js App Router, con Prisma schema, seed real, APIs protegidas, AuthProvider, dashboard, tabla de usuarios y docs.

### Prompt 2

Prompt exacto:

> Base zinc oscuro por defecto, seed con admin + minimo 25 usuarios realistas, commits por bloque, sin pedir confirmacion entre pasos.

Que devolvio:

- Reglas concretas de tema, datos iniciales, flujo de trabajo y granularidad de commits.

Que hice con eso:

- Configure tema zinc oscuro, cree 26 usuarios seeded con bcryptjs, ejecute migracion/seed contra Neon y cree commits separados por setup, Prisma, auth, API, UI y docs.

### Prompt 3

Prompt exacto:

> Verifica debounce, completa README.md y AI-LOG.md, luego haz commit y push final.

Que devolvio:

- Una lista de comprobacion para confirmar debounce de 300ms, campos obligatorios de README y campos obligatorios de AI-LOG.

Que hice con eso:

- Verifique `useDebounce(search, 300)` con `setTimeout`/`clearTimeout`, actualice README y AI-LOG con los campos faltantes y prepare el commit final.

## Output de IA rechazado o modificado

- Se pidio `middleware.ts`, pero Next.js 16 genero instrucciones indicando que `middleware` fue renombrado a `proxy`. Modifique esa salida y use `proxy.ts` porque es la convencion vigente y corre en runtime Node.js, compatible con `jsonwebtoken`.
- El componente `sonner` generado por shadcn dependia de `next-themes`. Lo modifique a tema `dark` fijo porque DevPanel no incluye toggle de tema.
- Un smoke test inicial con `curl.exe` produjo JSON invalido por escaping de PowerShell. Rechace ese resultado como evidencia y use `fetch` desde Node para validar login, cookies, `/me`, `/stats`, `/users` y logout.

## Estimacion honesta de autoria

- Codigo generado o guiado por IA: 85%.
- Curacion, decisiones, correcciones y verificacion propia: 15%.

## Una cosa excelente que hizo la IA

- Mantuvo una implementacion por bloques verificables con commits, tests, build y smoke tests reales.

## Una cosa que hizo mal

- Asumio una utilidad experimental de Next para probar proxy (`unstable_doesProxyMatch`) que no funciono en el entorno local; tuve que reemplazarla por una prueba mas estable del contrato de matcher.
