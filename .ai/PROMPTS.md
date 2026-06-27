# Prompts reutilizables

## Implementar un feature

```txt
Actua como senior full-stack en DevPanel. Antes de cambiar codigo, lee:
.ai/AGENTS.md
.ai/PROJECT_CONTEXT.md
.ai/ARCHITECTURE.md
.ai/BUSINESS_RULES.md
.ai/API_GUIDE.md
.ai/UI_GUIDE.md

Quiero implementar: [describe el feature].

Entrega:
1. impacto en archivos
2. riesgos
3. implementacion
4. validaciones ejecutadas
```

## Corregir un bug

```txt
Actua como ingeniero de debugging en DevPanel.
Lee primero:
.ai/AGENTS.md
.ai/ARCHITECTURE.md
.ai/MODULES.md
.ai/DEVELOPMENT_GUIDE.md

Bug a investigar: [describe el bug].

Necesito:
1. causa raiz respaldada por codigo
2. archivos afectados
3. fix propuesto
4. evidencia de validacion
```

## Revisar seguridad

```txt
Actua como reviewer de seguridad para DevPanel.
Lee:
.ai/AGENTS.md
.ai/API_GUIDE.md
.ai/PERMISSIONS.md
.ai/DATABASE.md

Revisa posibles riesgos en auth, cookies, exposicion de datos y validacion de inputs.
No inventes hallazgos; apoyalos con archivos y rutas.
```

## Refactorizar

```txt
Actua como arquitecto de software senior en DevPanel.
Lee:
.ai/AGENTS.md
.ai/ARCHITECTURE.md
.ai/MODULES.md
.ai/UI_GUIDE.md

Quiero refactorizar: [zona del proyecto].
Propone una version mas limpia sin romper contratos publicos ni comportamiento.
```

## Analizar permisos

```txt
Actua como especialista en permisos para DevPanel.
Lee:
.ai/PERMISSIONS.md
.ai/API_GUIDE.md
.ai/BUSINESS_RULES.md

Analiza si esta tarea requiere autorizacion por rol:
[describe el cambio]
```

## Revisar base de datos

```txt
Actua como especialista en Prisma/PostgreSQL para DevPanel.
Lee:
.ai/DATABASE.md
.ai/ARCHITECTURE.md
.ai/BUSINESS_RULES.md

Necesito evaluar este cambio de schema:
[describe el cambio]

Incluye impacto en migraciones, seed, tipos y APIs.
```

## Documentar un cambio nuevo

```txt
Actua como mantenedor de documentacion para DevPanel.
Lee la carpeta `.ai/` y actualiza solo los archivos necesarios segun este cambio:
[describe el cambio]

Indica que documentos tocaste y por que.
```
