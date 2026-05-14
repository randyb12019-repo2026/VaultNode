# Especificación Técnica — Landing Page "VaultNode" (v2.1)

> **Instrucción para la IA de coding:** Implementa TODO siguiendo esta especificación técnica adjunta. No omitas ninguna sección. Prioriza la fidelidad al design system sobre la velocidad de implementación. Si algo no encaja técnicamente, pregunta antes de improvisar.

---

## 1. Visión General del Producto

**VaultNode** es una landing page para una bóveda de conocimiento offline y air-gapped (alternativa a Obsidian/Notion) dirigida a usuarios conscientes de la seguridad, homelabbers y entornos empresariales aislados.

- **Posicionamiento**: "Tu cerebro digital. 100% Air-Gapped."
- **Atmósfera (Vibe)**: Ciberseguridad de grado militar, modo oscuro extremo, acentos tácticos en rojo neón.
- **Formato**: Landing page de una sola página (Next.js 15 App Router), totalmente responsiva, sin backend.

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router) |
| Core UI | React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Componentes UI | shadcn/ui (base opcional) |
| Animaciones | Framer Motion v11+ |
| Iconos | Lucide React |
| Fuente (Headers/UI) | Geist o Inter (via `next/font/google`) |
| Fuente (Mono/Terminal) | JetBrains Mono (via `next/font/google`) |

**Comandos de inicialización:**
```bash
npx create-next-app@latest vaultnode --typescript --tailwind --app
cd vaultnode
npm install framer-motion lucide-react
```

**Nota sobre Tailwind v4:** Next.js 15+ integra Tailwind v4 nativamente. Los tokens de color y estilos se definen en `globals.css` usando la directiva `@theme`. No se usa `tailwind.config.js`.

---

## 3. Sistema de Diseño

### 3.1 Tokens de Color

| Token | Valor | Uso |
|-------|-------|-----|
| `bg-base` | `#050505` / `bg-neutral-950` | Fondo general de la página |
| `bg-panel` | `rgba(10,10,10,0.5)` / `bg-neutral-900/50` | Tarjetas y paneles |
| `border-default` | `border-neutral-800` | Bordes por defecto |
| `border-hover` | `rgba(220,38,38,0.3)` | Brillo rojo en bordes al hacer hover |
| `accent-red` | `#ef4444` / `text-red-500` | Texto de acento primario |
| `accent-red-bg` | `#dc2626` / `bg-red-600` | Botones primarios |
| `accent-glow` | `shadow-[0_0_20px_rgba(220,38,38,0.4)]` | Resplandor (glow) en botones |
| `text-primary` | `#fafafa` / `text-neutral-50` | Titulares (H1, H2) |
| `text-secondary` | `#a3a3a3` / `text-neutral-400` | Cuerpo de texto y subtítulos |
| `text-muted` | `#525252` / `text-neutral-600` | Marcas de tiempo, footer |
| `terminal-green` | `#22c55e` (opacidad ~60%) | Logs de consola |

### 3.2 Tipografía

- **Titulares**: Geist/Inter, tracking ajustado (`tracking-tight`), pesos 700-800.
- **Cuerpo**: Geist/Inter, peso 400, interlineado relajado (`leading-relaxed`).
- **Mono/Terminal**: JetBrains Mono, peso 400, sin interlineado extra (`leading-none`).
- **Escala**:
  - Hero H1: `text-5xl md:text-7xl lg:text-8xl`
  - Sección H2: `text-3xl md:text-4xl`
  - Cuerpo: `text-base md:text-lg`
  - Terminal: `text-sm`

### 3.3 Textura Global (Efecto "Noise")

Aplicar un sutil ruido CSS sobre todo el fondo de la página para evitar el aspecto de "web plana" y darle un toque de hardware físico:

```css
/* app/globals.css */
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### 3.4 Espaciado y Layout

- Ancho máximo de contenedor: `max-w-7xl mx-auto px-6 lg:px-8`
- Padding vertical de secciones: `py-24 md:py-32`
- Gap del Grid (Bento): `gap-4 md:gap-6`

---

## 4. Estructura de la Página y Secciones

### Sección 1: Hero

**Layout**: Altura completa del viewport (`min-h-screen`), contenido centrado, stack vertical.

**Elementos**:

1. **Fondo**: `bg-neutral-950` + patrón sutil de puntos/grid (usando gradientes radiales CSS, opacidad ~0.1).
2. **Titular**: "Tu cerebro digital. 100% Air-Gapped."
   - Estilo: `text-neutral-50`, tamaño masivo, `tracking-tight`, `font-bold`.
3. **Subtítulo**: "La alternativa a Notion para entornos hiper-seguros. Sin nube, sin telemetría, solo tú y tus datos."
   - Estilo: `text-neutral-400`, `max-w-2xl`, centrado.
4. **Botón CTA**: "Descargar Binario v2.4"
   - Estilo: `bg-red-600 text-white px-8 py-4 rounded-lg font-medium`
   - Hover: `shadow-[0_0_20px_rgba(220,38,38,0.4)]` + ligero escalado (`scale-105`).
   - Transición: `transition-all duration-300`.
5. **Animación de entrada**: Framer Motion `fade-in-up` (opacidad 0→1, `y: 30→0`, duración 0.8s, `staggerChildren` 0.15s).

---

### Sección 2: Mockup Interactivo (Efecto "Descifrado")

**Layout**: Contenedor centrado, `max-width ~900px`. Simula una ventana de macOS en modo oscuro.

**Responsive**: En mobile (< `md`), el sidebar debe ocultarse completamente y el editor ocupar el 100% del ancho. Solo se muestra el área del editor con el texto cifrado/descifrado.

**Elementos**:

1. **Cromo de la ventana**:
   - Barra superior: `bg-neutral-800/80`, `rounded-t-xl`, altura ~36px.
   - Tres botones (rojo/amarillo/verde) a la izquierda, círculos de 12px.
   - Título centrado: `"vault-node-editor"` en JetBrains Mono, `text-neutral-500`, `text-xs`.

2. **Sidebar** (izquierda, ~25% del ancho, **solo desktop**):
   - `bg-neutral-900/50`, borde derecho `border-neutral-800`.
   - Árbol de carpetas: `"vault/"`, `"notes/"`, `"crypto/"`, `"logs/"` usando el icono `Folder` de Lucide.
   - Texto: JetBrains Mono, `text-neutral-400`, `text-sm`.

3. **Área del Editor** (derecha, ~75% desktop / 100% mobile):
   - Fondo: `bg-neutral-950`.
   - **Estado por defecto**: Texto cifrado — sopa de caracteres alfanuméricos/símbolos aleatorios (ej. `x9#mK2$...`) llenando el área. JetBrains Mono, `text-neutral-600`.
   - **Interacción Hover**:
     - **Disparador**: `onMouseEnter` en el contenedor de la ventana.
     - **Efecto Scramble**: Implementar con React `useState` + `useEffect`. Ciclar strings aleatorios con `setInterval` de 50ms durante 1000ms antes de mostrar el texto final.
     - **Texto revelado**: `# Protocolos de Seguridad Alpha` (Estilo H1 de Markdown, `text-neutral-50`).
     - **Barra de Progreso**: Una fina línea de 2px en la parte superior del editor. Color: `bg-red-500`. Animar ancho de 0% a 100% usando Framer Motion `motion.div` con `animate={{ width: "100%" }}` y `transition={{ duration: 1, ease: "linear" }}`, sincronizada con el inicio del scramble.

**Implementación del Scramble (referencia exacta):**

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const TARGET = "# Protocolos de Seguridad Alpha";
const DURATION = 1000; // ms
const INTERVAL = 50;   // ms

export function ScrambleText() {
  const [displayText, setDisplayText] = useState(generateScramble(TARGET.length));
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  function generateScramble(len: number) {
    return Array.from({ length: len }, () =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("");
  }

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(generateScramble(TARGET.length));
      setProgress(0);
      return;
    }

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += INTERVAL;
      const revealIndex = Math.floor((elapsed / DURATION) * TARGET.length);

      setDisplayText(
        TARGET.split("")
          .map((char, i) =>
            i < revealIndex ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      setProgress(Math.min((elapsed / DURATION) * 100, 100));

      if (elapsed >= DURATION) {
        clearInterval(interval);
        setDisplayText(TARGET);
        setProgress(100);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {/* Barra de progreso */}
      <div className="h-[2px] w-full bg-neutral-800">
        <motion.div
          className="h-full bg-red-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>
      {/* Texto */}
      <div className="font-mono text-neutral-50 text-xl md:text-2xl p-6">
        {displayText}
      </div>
    </div>
  );
}
```

**Animación de entrada**: Fade-in + escalado (0.95→1) al hacer scroll.

---

### Sección 3: Bento Grid (Características)

**Layout**: CSS Grid asimétrico.
- **Escritorio**: 3 columnas. Tarjeta 1 ocupa 2 columnas. Tarjetas 2 y 3 se apilan verticalmente en la tercera columna.
- **Móvil**: Apilamiento vertical en 1 columna.

**Estilo Global de Tarjetas**:
- Fondo: `bg-neutral-900/50`
- Borde: `1px solid border-neutral-800`
- Radio: `rounded-xl`
- Padding: `p-6 md:p-8`
- Hover: Transición del color del borde a `rgba(220,38,38,0.3)`, sombra sutil `shadow-[0_0_15px_rgba(220,38,38,0.1)]`. Transición: `transition-all duration-500`.

**Contenido de las Tarjetas**:

1. **Tarjeta Ancha — Sync P2P Cifrada**
   - Icono: `Network` (Lucide)
   - Título: "Sync P2P Cifrada"
   - Descripción: "Sincroniza nodos locales vía Tailscale sin tocar servidores públicos."
   - Icono estilo: `text-red-500`, tamaño 32px.

2. **Tarjeta Cuadrada — Cifrado AES-256**
   - Icono: `Lock` (Lucide)
   - Título: "Cifrado AES-256"
   - Descripción: "Tus notas son un bloque de hielo indescifrable en reposo."

3. **Tarjeta Cuadrada — Arquitectura Ligera**
   - Icono: `Terminal` (Lucide)
   - Título: "Arquitectura Ligera"
   - Descripción: "Optimizado para correr en Docker, Raspberry Pi o máquinas virtuales aisladas."

---

### Sección 4: System Logs (Prueba Social)

**Layout**: Sección de ancho completo. `bg-black` (negro puro, `#000000`). Contenedor centrado.

**Estilo**:
- Fuente: JetBrains Mono.
- Color de texto: `text-green-500/60` (verde consola atenuado).
- Cada log en una línea, `text-sm`, `leading-loose`.
- Formato: `[SYS_LOG] user: {username} | msg: "{message}"`

**Contenido**:
```
[SYS_LOG] user: sec_ops_01 | msg: "La única herramienta de documentación aprobada para nuestro clúster aislado."
[SYS_LOG] user: homelabber_99 | msg: "La velocidad de renderizado de grafos en local destruye a cualquier alternativa web."
[SYS_LOG] user: dev_null | msg: "Finalmente una solución sin telemetría oculta ni dependencias de terceros."
```

**Animación de entrada**: Sequential fade-in con stagger. Usar Framer Motion `variants` con `staggerChildren: 0.2`:

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
  {logs.map((log, i) => (
    <motion.div key={i} variants={itemVariants}>
      {log}
    </motion.div>
  ))}
</motion.div>
```

---

### Sección 5: Pricing (Licencias)

**Layout**: Grid de dos columnas (iguales en desktop, apiladas en mobile). Centrado, `max-width ~800px`.

**Tarjeta 1 — Community (Izquierda)**:
- Precio: "0$"
- Label: "Community"
- Estilo: `bg-neutral-900/30`, `border-neutral-800`.
- Features: Código abierto, Auto-alojado, Actualizaciones vía Git, Community support.
- CTA: "Clonar Repositorio" (botón secundario, `border-neutral-700 text-neutral-300 hover:border-neutral-500`).

**Tarjeta 2 — Enterprise Air-Gapped (Derecha)**:
- Precio: "49$/mes"
- Label: "Enterprise Air-Gapped"
- **Badge**: "Recomendado" — pill pequeño, `bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full`, posicionado arriba a la derecha de la tarjeta (con `absolute` y `top-4 right-4`).
- Estilo: `bg-neutral-900/50`, `border-red-500/40`.
- **Hover**: Glow más intenso que las tarjetas Bento. `shadow-[0_0_25px_rgba(220,38,38,0.15)]` + borde `border-red-500/60`. Transición `duration-500`.
- Features: Soporte prioritario, Auditoría de seguridad, Despliegue offline asistido, SLA 99.9%.
- CTA: "Contactar Ventas" (botón primario rojo, `bg-red-600 hover:bg-red-700`).

---

### Sección 6: Footer (Terminal)

**Layout**: Ancho completo, `bg-neutral-950`, borde superior `border-neutral-800`, padding `py-12`.

**Elementos**:

1. **Izquierda**: Prompt de consola.
   - Texto: `root@vaultnode:~$ exit_`
   - Fuente: JetBrains Mono, `text-neutral-400`, `text-sm`.
   - **Cursor**: Guión bajo parpadeante tras `exit`. Implementar con CSS puro:
     ```css
     @keyframes blink {
       0%, 100% { opacity: 1; }
       50% { opacity: 0; }
     }
     .cursor-blink {
       animation: blink 1s step-end infinite;
     }
     ```

2. **Derecha**: Enlaces.
   - "GitHub" | "Docker Hub" | "Docs"
   - Estilo: `text-neutral-600 hover:text-neutral-400`, `text-sm`, espaciados con `gap-6`.

3. **Centro inferior** (opcional pero recomendado):
   - Copyright: `© 2026 VaultNode. All rights reserved.`
   - Estilo: `text-neutral-700`, `text-xs`, `mt-8`.

---

## 5. Animaciones e Interacciones Globales

### 5.1 Entrada al hacer Scroll (Framer Motion)

Crear un wrapper `FadeInWhenVisible` reutilizable para toda la aplicación. Usar **solo en componentes cliente** (hojas con interacción). Las secciones estáticas pueden ser Server Components.

```tsx
"use client";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

### 5.2 Patrones de Hover

- **Botones**: `scale-105` + glow shadow + `transition-all duration-300`.
- **Tarjetas Bento**: Border color shift a rojo + sombra roja sutil + `transition-all duration-500`.
- **Tarjeta Enterprise**: Glow rojo más intenso que Bento (`shadow-[0_0_25px_rgba(220,38,38,0.15)]`) + borde `border-red-500/60`.
- **Enlaces Footer**: Color shift `neutral-600` → `neutral-300`.

### 5.3 Rendimiento en Next.js 15

- Usar `"use client"` **solo** en componentes hoja que contengan estado de React o animaciones de Framer Motion (Mockup, FadeIn, SystemLogs).
- Mantener `page.tsx` y `layout.tsx` como Server Components.
- Usar `will-change-transform` en elementos animados.
- Preferir `transform` y `opacity` para animaciones (GPU accelerated).
- Respetar `prefers-reduced-motion`: si el usuario lo tiene activado, desactivar todas las animaciones de Framer Motion y el scramble effect.

---

## 6. Estructura de Archivos (App Router)

```
app/
├── layout.tsx               # Root layout: fuentes + noise overlay + metadata SEO
├── page.tsx                 # Landing principal (Server Component)
├── globals.css              # Tailwind v4 + keyframes (noise, blink) + @theme tokens
├── components/
│   ├── ui/
│   │   ├── FadeIn.tsx       # Wrapper Framer Motion ("use client")
│   │   └── TerminalBlink.tsx
│   ├── sections/
│   │   ├── Hero.tsx         # Server Component (estático)
│   │   ├── Mockup.tsx       # Client Component (scramble + progress bar)
│   │   ├── BentoGrid.tsx    # Server Component
│   │   ├── SystemLogs.tsx   # Client Component (stagger animation)
│   │   ├── Pricing.tsx      # Server Component
│   │   └── Footer.tsx       # Server Component (cursor es CSS puro)
└── lib/
    └── utils.ts             # Funciones helper (cn/clsx)
```

### 6.1 Metadata SEO (layout.tsx)

Incluir en el root layout:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VaultNode — Tu cerebro digital. 100% Air-Gapped.",
  description: "La alternativa a Notion para entornos hiper-seguros. Sin nube, sin telemetría, solo tú y tus datos.",
  openGraph: {
    title: "VaultNode",
    description: "Bóveda de conocimiento offline y air-gapped.",
    type: "website",
  },
};
```

---

## 7. Criterios de Aceptación

- [ ] La página renderiza sin errores en Next.js 15 (React 19).
- [ ] La textura de "ruido" es visible pero extremadamente sutil (≤3% opacidad).
- [ ] El CTA del Hero brilla en rojo al hacer hover usando el token de sombra exacto.
- [ ] El efecto "Scramble" del mockup se activa de forma limpia en el hover, dura ~1s y revela texto markdown.
- [ ] La barra de progreso en el mockup se llena de 0 a 100% en sincronía con el descifrado.
- [ ] El mockup es totalmente funcional en mobile: sidebar oculto, editor a pantalla completa.
- [ ] Las tarjetas Bento iluminan sus bordes de color rojo táctico en hover.
- [ ] La tarjeta Enterprise tiene un glow rojo más intenso que las tarjetas Bento.
- [ ] La sección System Logs parece una terminal real (fuente, color, spacing, stagger animation).
- [ ] El cursor del Footer parpadea de forma infinita.
- [ ] Las animaciones de entrada en scroll son fluidas (60fps).
- [ ] El layout respeta `prefers-reduced-motion` (sin animaciones si el usuario lo solicita).
- [ ] Metadata SEO está correctamente implementada en `layout.tsx`.
