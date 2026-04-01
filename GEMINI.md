# BurgerBrand — Guía de Arquitectura

> Referencia viva para el equipo de desarrollo. Actualizar cuando se agreguen nuevas páginas o decisiones de diseño.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Estilos | Tailwind CSS 4 |
| Lenguaje | TypeScript 5 (strict) |
| Fonts | Spline Sans (Google Fonts) |
| Iconos | Material Symbols Outlined |

---

## Estructura de Carpetas

```
app/
├── api/
│   ├── menu/route.ts         # GET /api/menu [NEW]
│   └── products/route.ts     # GET /api/products
├── menu/
│   └── page.tsx              # Menu page (Server Component) [NEW]
├── globals.css               # Design tokens (@theme) + utilidades globales
├── layout.tsx                # Root layout: fuente, dark mode, metadata
└── page.tsx                  # Home page (Server Component con fetch)

components/
├── atoms/                    # Elementos mínimos, sin dependencias internas
│   ├── Badge.tsx             # Etiquetas: primary | dark | green
│   ├── Button.tsx            # Botones: primary | secondary | ghost | icon
│   └── Icon.tsx              # Wrapper de Material Symbols
├── molecules/                # Combinaciones de atoms
│   ├── CustomerAvatars.tsx   # Avatars apilados + rating
│   ├── FeatureCard.tsx       # Tarjeta de característica (icono + texto)
│   ├── FilterChip.tsx        # Pill de filtro de categoría [NEW]
│   ├── MenuCard.tsx          # Tarjeta de producto de menú completa [NEW]
│   ├── NavActions.tsx        # Acciones del navbar (search, cart, login)
│   ├── NavLogo.tsx           # Logo + nombre de marca
│   └── ProductCard.tsx       # Tarjeta de producto (imagen, precio, botón)
└── organisms/                # Secciones completas de UI
    ├── FeaturesSection.tsx   # Sección "Calidad Artesanal"
    ├── FilterBar.tsx         # Barra de filtros horizontal (Client) [NEW]
    ├── FloatingCart.tsx      # Carrito flotante responsive (Client) [NEW]
    ├── Footer.tsx            # Pie de página
    ├── HeroSection.tsx       # Hero principal con imagen y CTAs
    ├── MenuGrid.tsx          # Grid de productos con filtrado (Client) [NEW]
    ├── MenuHeroBanner.tsx    # Banner superior del menú [NEW]
    ├── Navbar.tsx            # Cabecera sticky con nav links
    └── PopularSection.tsx    # Carousel "Populares esta semana" (Client)

lib/
├── data/
│   ├── home.ts              # Datos estáticos: products, features, avatars
│   └── menu.ts              # Datos estáticos: menuItems, heroBannerImage [NEW]
├── services/
│   ├── menu.ts              # Fetch desde /api/menu (ISR 1h) [NEW]
│   └── products.ts          # Fetch desde /api/products (ISR 1h)
├── types.ts                 # Interfaces: Product, MenuItem, etc.
└── utils.ts                 # cn() = clsx + tailwind-merge
```

---

## Design Tokens (globals.css)

Definidos con `@theme` de Tailwind 4 — se usan como clases normales:

| Token | Clase Tailwind | Valor |
|---|---|---|
| Primary | `bg-primary`, `text-primary` | `#36e27b` |
| Background light | `bg-background-light` | `#f6f8f7` |
| Background dark | `bg-background-dark` | `#112117` |
| Surface dark | `bg-surface-dark` | `#1c2620` |
| Surface border | `border-surface-border` | `#29382f` |
| Text secondary | `text-text-secondary` | `#9eb7a8` |
| Font | `font-display` | Spline Sans |

> **Regla:** Nunca usar `var()` en `className`. Siempre usar las clases semánticas de arriba.

---

## Arquitectura Atómica

```
atoms → molecules → organisms → page
```

- **Atoms**: sin lógica, sin estado, sólo presentación pura (`Badge`, `Button`, `Icon`)
- **Molecules**: combinan átomos con una función específica (`ProductCard`, `NavLogo`, …)
- **Organisms**: secciones completas que componen moléculas y átomos (`Navbar`, `HeroSection`, …)
- **Page**: Server Component que hace fetch y pasa datos a organisms

### Regla de dependencias
Los átomos **no** importan moléculas ni organismos. Las moléculas **no** importan organismos.

---

## Convenciones TypeScript

- Interfaces **planas** (máximo 1 nivel de anidación; objetos anidados → interfaz separada)
- **Const types** para uniones: `const VARIANT = { A: "a" } as const`
- Nunca `any` — usar `unknown` o genéricos
- Exports con nombre (`export function`) para componentes — nunca export default en componentes

---

## Patrones de Datos

### Flujo de datos para productos
```
lib/data/home.ts  →  app/api/products/route.ts  →  lib/services/products.ts  →  app/page.tsx
(datos estáticos)      (GET /api/products)           (fetch con ISR 1h)           (Server Component)
```

### Agregar nuevos datos
1. Agregar el tipo en `lib/types.ts`
2. Agregar los datos en `lib/data/home.ts` (o crear nuevo archivo en `lib/data/`)
3. Crear la ruta API en `app/api/<recurso>/route.ts`
4. Crear el service en `lib/services/<recurso>.ts`
5. Consumir en el Server Component correspondiente

---

## Convenciones de Componentes

### Server vs Client Components
- Por defecto: **Server Component** (sin `"use client"`)
- Usar `"use client"` solo cuando se necesita: estado, efectos, eventos DOM
- Actualmente: `NavActions.tsx` y `PopularSection.tsx` son Client Components

### Images
- Siempre usar `<Image>` de `next/image`
- Configurar dominios externos en `next.config.ts` → `images.remotePatterns`
- Imágenes en una cuadrícula: usar `fill` + `sizes` + `relative` en el contenedor

### Responsive
- Mobile-first con breakpoints: `md:` (768px) y `lg:` (1024px)
- Layout principal: `px-4 md:px-10 lg:px-40`
- Máximo ancho de contenido: `max-w-7xl mx-auto`

---

## Próximas Páginas — Guía Rápida

Para construir una nueva página:

1. **Reutilizar** `Navbar` y `Footer` — ya son organismos standalone
2. **Crear** nuevos organismos en `components/organisms/`
3. **Reutilizar** átomos existentes, crear nuevos en `components/atoms/` si hace falta
4. **Datos**: seguir el patrón `data → api → service → page`
5. **Ruta**: crear `app/<ruta>/page.tsx` como Server Component

### Componentes disponibles para reusar
- `Navbar` — header sticky con dark mode
- `Footer` — pie de página
- `Badge` — etiquetas con variantes
- `Button` — 4 variantes de botón
- `Icon` — cualquier Material Symbol
- `FeatureCard` — tarjeta con icono + título + descripción
- `ProductCard` — tarjeta de producto completa

---

## SKILLS disponibles

- .agents/skills/typescript/SKILL.md
- .agents/skills/zod-4/SKILL.md
- .agents/skills/next-15/SKILL.md
- .agents/skills/zustand-5/SKILL.md
- .agents/skills/tailwind-4/SKILL.md
- .agents/skills/react-19/SKILL.md
- .agents/skills/auth/SKILL.md

## Imágenes Permitidas

Configuradas en `next.config.ts`:
- `lh3.googleusercontent.com/aida-public/**` (imágenes del diseño)

Para agregar más dominios, editar `images.remotePatterns` en `next.config.ts`.
