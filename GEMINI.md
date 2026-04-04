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
| Iconos | Lucide React (vía átomo Icon) |

---

## Estructura de Carpetas

```
app/
├── actions/                  # Next.js Server Actions (Reemplaza API Routes)
│   ├── products.ts           # CRUD de productos
│   ├── cart.ts               # Lógica de sincronización de carrito
│   └── profile.ts            # Gestión de perfil de usuario
├── menu/
│   └── page.tsx              # Página de menú (Server Component)
├── admin/                    # Panel de administración
│   ├── products/page.tsx     # Gestión de catálogo
│   └── users/page.tsx        # Gestión de usuarios
├── globals.css               # Design tokens (@theme) + utilidades globales
├── layout.tsx                # Root layout: fuente, dark mode, metadata
└── page.tsx                  # Home page (Server Component)

components/
├── atoms/                    # Elementos mínimos, sin dependencias internas
│   ├── Badge.tsx             # Etiquetas con variantes (primary, dark, vegan, etc.)
│   ├── Button.tsx            # Átomo central de botones (primary, secondary, etc.)
│   ├── Icon.tsx              # Wrapper de Lucide React con mapeo dinámico
│   ├── LoadingSpinner.tsx    # Spinner animado premium [NEW]
│   └── Modal.tsx             # Base para ventanas modales
├── molecules/                # Combinaciones de atoms
│   ├── AdminTable.tsx        # Tabla de gestión de datos [NEW]
│   ├── CartSync.tsx          # Sincronización de estado local/DB [NEW]
│   ├── CustomerAvatars.tsx   # Avatars apilados + rating
│   ├── FeatureCard.tsx       # Tarjeta de característica
│   ├── FilterChip.tsx        # Pill de filtro de categoría
│   ├── OrderSummary.tsx      # Resumen de totales en checkout [NEW]
│   └── ProductCard.tsx       # Tarjeta de producto (Unificada Home/Menú) [REF]
└── organisms/                # Secciones completas de UI
    ├── AuthForm.tsx          # Formulario de Login/Registro [NEW]
    ├── CartSheet.tsx         # Panel lateral de carrito (Drawer) [NEW]
    ├── FeaturesSection.tsx   # Sección "Calidad Artesanal"
    ├── FilterBar.tsx         # Barra de filtros horizontal (Client)
    ├── FloatingCart.tsx      # Botón flotante de acceso al carrito
    ├── Footer.tsx            # Pie de página
    ├── HeroSection.tsx       # Hero principal
    ├── MenuGrid.tsx          # Grid de productos con filtrado (Client)
    ├── Navbar.tsx            # Cabecera sticky con navegación y auth
    ├── PopularSection.tsx    # Carousel "Populares esta semana"
    └── ProductModal.tsx      # Modal de edición de producto para Admin [NEW]

lib/
├── store/
│   └── useCart.ts           # Estado global del carrito (Zustand)
├── services/
│   ├── products.ts          # Acceso a datos vía Supabase
│   └── user.ts              # Servicios de perfil y auth
├── types.ts                 # Interfaces: Product, CartItem, UserProfile, etc.
└── utils.ts                 # cn() y formateadores
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

- **Atoms**: sin lógica de negocio, sin dependencias internas (`Badge`, `Button`, `Icon`, `LoadingSpinner`)
- **Molecules**: combinan átomos para una función específica (`AdminTable`, `ProductCard`)
- **Organisms**: secciones complejas, a menudo conectadas a acciones o estado global (`Navbar`, `CartSheet`)
- **Page**: Server Component que orquestra la carga inicial de datos.

### Regla de dependencias
Los átomos **no** importan moléculas ni organismos. Las moléculas **no** importan organismos.

---

## Convenciones TypeScript

- Interfaces **planas** (objetos anidados → interfaz separada).
- **Enums/Const types** para variantes: `const VARIANT = { ... } as const`.
- **Prohibido el uso de `any`**. Usar tipos específicos o genéricos si es necesario.
- Exports con nombre (`export function Name`) para facilitar el autocompletado y refactor.

---

## Patrones de Datos

### Flujo de datos Moderno
```
lib/services/products.ts  →  app/actions/products.ts  →  Componente (Server/Client)
(Acceso directo DB)          (Validación + Mutación)       (Renderizado/Invocación)
```

---

## Convenciones de Componentes

### Server vs Client Components
- Por defecto: **Server Component**.
- Usar `"use client"` solo para: hooks de estado/efecto, eventos del DOM, Framer Motion.
- Mantener los Client Components lo más pequeños posible (hoisting).

### Buttons & Icons
- Usar siempre el átomo `Button` para cualquier interacción clicable.
- Los iconos deben consumirse mediante `Icon`, usando los nombres de Lucide.

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
