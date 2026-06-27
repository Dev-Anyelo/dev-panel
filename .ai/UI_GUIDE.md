# Guia de UI

## Estructura visual

- Dark mode por defecto.
- Fondo base: `bg-background`
- Superficies principales: `bg-card`
- Sidebar y sheet usan tokens `sidebar-*`

## Librerias UI

- shadcn/ui como base de componentes
- Tailwind CSS v4
- Lucide React para iconografia
- Sonner para notificaciones

## Tipografias

- Titulos: `Space Grotesk` via `--font-space-grotesk`
- Texto general: `Plus Jakarta Sans` via `--font-plus-jakarta`
- Datos monoespaciados: `JetBrains Mono` via `--font-jetbrains-mono`

## Convenciones de componentes

- Las paginas `page.tsx` deben ser delgadas.
- Las piezas de dominio viven en carpetas propias:
  - `components/auth`
  - `components/dashboard`
  - `components/users`
  - `components/layout`
- Reutilizar `Button`, `Card`, `Input`, `Badge`, `Avatar`, `Sheet`, `DropdownMenu`, `Skeleton`, `Tooltip`.

## Formularios

- El login es el unico formulario principal actual.
- Se usan `Input`, `Label`, estados locales y feedback con `Alert`.
- El boton de submit debe indicar estado de carga.

## Manejo de estados

- Skeleton para cargas intermedias.
- `Spinner` para carga inicial pesada.
- `Empty` para estados vacios.
- `toast` de `sonner` para feedback global.

## Reglas para mantener consistencia visual

- Preferir clases semanticas:
  - `bg-card`
  - `text-foreground`
  - `text-muted-foreground`
  - `border-border`
  - `bg-primary`
- Evitar colores hardcodeados salvo cuando un badge necesita un tono muy puntual y ya existe esa convencion en el proyecto.
- Mantener `transition-colors duration-150` en elementos interactivos.
- Mantener copy en espanol.

## Responsive y UX

- En mobile el sidebar se abre con `Sheet`.
- La tabla de usuarios admite overflow horizontal.
- El login oculta el panel izquierdo en mobile.

## Archivos clave

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/layout/protected-layout.tsx`
- `src/components/auth/login-split-panel.tsx`
- `src/components/users/users-table.tsx`
