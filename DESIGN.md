---
version: "alpha"
name: La Magia de los Vientos
description: >
  Marca de bienestar botánico y terapia floral. Identidad visual de "Quiet Luxury" 
  aplicado al wellness: sofisticación sin ostentación, naturaleza sin rusticidad. 
  Evoca la intimidad de una farmacia artesanal de lujo europea.

colors:
  primary: "#1B271C"
  primary-light: "#2D3F2E"
  accent: "#C5A059"
  accent-dark: "#A6823D"
  secondary: "#FAFAF8"
  secondary-dark: "#F2EFE9"
  earth: "#7A746E"
  earth-light: "#D1CEC9"
  background: "#FFFFFF"
  foreground: "#1A1918"

typography:
  display:
    fontFamily: Playfair Display
    fontSize: clamp(2.5rem, 6vw, 4.5rem)
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h1:
    fontFamily: Playfair Display
    fontSize: 3.5rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  h2:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  h3:
    fontFamily: Playfair Display
    fontSize: 1.8rem
    fontWeight: 400
    lineHeight: 1.25
  h4:
    fontFamily: Playfair Display
    fontSize: 1.25rem
    fontWeight: 400
  body-lg:
    fontFamily: Outfit
    fontSize: 1.2rem
    fontWeight: 300
    lineHeight: 1.8
  body-md:
    fontFamily: Outfit
    fontSize: 1rem
    fontWeight: 300
    lineHeight: 1.8
  body-sm:
    fontFamily: Outfit
    fontSize: 0.9rem
    fontWeight: 300
    lineHeight: 1.6
  caption:
    fontFamily: Outfit
    fontSize: 0.75rem
    fontWeight: 700
    letterSpacing: "0.3em"

rounded:
  none: 0
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  xxl: 120px
  section: 10rem

shadows:
  sm: "0 4px 20px rgba(0, 0, 0, 0.03)"
  md: "0 20px 50px rgba(0, 0, 0, 0.06)"
  xl: "0 40px 80px rgba(0, 0, 0, 0.10)"

components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 2rem"
    typography: "caption"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 2rem"
    typography: "caption"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 2rem"
    typography: "caption"
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "2.5rem"
  card-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "3rem"
  badge:
    backgroundColor: "{colors.secondary-dark}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0.2rem 0.8rem"
    typography: "caption"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0.2rem 0.8rem"
    typography: "caption"

---

## Overview

**La Magia de los Vientos** es un centro de armonización vibracional y farmacia floral artesanal. La identidad visual sigue el paradigma **"Quiet Luxury Botánico"**: sin colores brillantes ni estridencias, con materiales y texturas evocadas a través de color y tipografía.

El tono visual es el de una *farmacéutica de lujo europea del siglo XIX*, modernizada. Piensa en *Aesop*, *Officine Universelle Buly* o *Santa Maria Novella* — pero accesible desde Argentina.

## Colors

La paleta es minimalista y de alto contraste emocional. No hay colores "limpios" ni genéricos.

- **Primary (#1B271C):** Verde bosque profundo. Es el color del conocimiento botánico, la tierra húmeda, el musgo. Se usa en fondos de secciones premium y en elementos de autoridad.
- **Accent (#C5A059):** Oro Champagne / Oro Viejo. El único color "caliente" de la paleta. Reservado exclusivamente para énfasis de alto valor: precios, badges "Best Seller", hover en CTAs especiales, el número de años de experiencia. Nunca usarlo en fondos amplios.
- **Secondary (#FAFAF8):** Alabastro. El blanco no es blanco puro; tiene una calidez mineral. Es el fondo de secciones light y de tarjetas de producto.
- **Earth (#7A746E):** Gris topo / Pizarra cálida. El color del texto secundario, descripciones, captions. Nunca para H1 o CTAs.
- **Foreground (#1A1918):** Casi negro con matiz cálido. El tinta. Para el texto de cuerpo principal y botones primarios.

## Typography

El sistema usa **dos familias con roles estrictamente definidos**:

### Playfair Display (Serif) — Para todo lo editorial
Todos los headings (H1–H4), nombres de productos, títulos de sección y textos de "autoridad" usan Playfair Display. Nunca en peso Bold — siempre 400 (Regular) o 300. La elegancia viene del corte del tipo, no del grosor.

### Outfit (Sans-serif) — Para todo lo funcional
Cuerpo de texto, descripciones, labels de formularios, navegación, botones. Se usa en peso 300 (Light) para el cuerpo y 500–700 solo para botones y badges en caps.

### Regla de contraste tipográfico
El contraste entre Playfair (emocional, narrativo) y Outfit (claro, funcional) es el motor visual del diseño. Jamás mezclar dos fuentes serif ni dos sans-serif.

## Layout & Grid

- **Máximo ancho del contenedor:** 1100px
- **Padding de sección:** 10rem (vertical), 1.5rem (horizontal)  
- **Ritmo espacial:** Escala en múltiplos de 8px

Las secciones alternan entre fondo blanco (`--background`) y fondo primario (`--color-primary`) para generar ritmo visual sin necesitar muchos colores. Una sección "dark" con fondo verde bosque tiene todo el texto en blanco o en el tono alabastro.

## Components & Patterns

### Botones
Todos los botones tienen texto en **mayúsculas con letter-spacing amplio** (`text-transform: uppercase; letter-spacing: 0.1em`). Esto les da un carácter de etiqueta de producto artesanal. El `border-radius` es mínimo (4px) — sin pill-shapes en CTAs principales.

### Cards de Producto
Imagen de producto sobre fondo alabastro (#FAFAF8), sin sombras agresivas. El hover es un `translateY(-8px)` suave con `border-color` cambiando a `--foreground`. El precio se muestra en Playfair Display, peso 400, tamaño grande.

### Badges / Tags
Siempre en caps con letra Outfit weight 700. Los badges "Best Seller" o "Urgente" usan el acento dorado. Los informativos (categoría, tipo de línea) usan el secondary-dark.

### Secciones Premium (Dark)
Fondo `--color-primary` (#1B271C). Texto en blanco o en tonos de secondary. El acento dorado aparece como highlight de elementos puntuales. Estas secciones se reservan para: filosofía de marca, proceso terapéutico, CTAs de consultoría.

## Tone & Voice (para copy en componentes)

- **No usar:** "maravilloso", "increíble", "mágico" como adjetivos vacíos
- **Sí usar:** vocabulario técnico-botánico con explicación accesible ("Impatiens actúa sobre el sistema nervioso simpático...")
- **Tono:** Terapeuta experta, no vendehumos. Autoridad serena.
- El copy de botones de CTA debe ser **acción + beneficio**: "Iniciar Mi Transformación" en lugar de solo "Comprar".

## Do / Don't

**✅ DO:**
- Fondos con mucho espacio en blanco / respiro
- Imágenes en tonos desaturados, con tratamiento de color cálido
- Usar el acento dorado con moderación (máximo 1–2 elementos por sección)
- Tipografía Playfair en tamaños grandes con kerning ajustado

**❌ DON'T:**
- Usar gradientes arco iris o colores saturados
- Pill-shaped buttons (border-radius > 8px) en CTAs principales  
- Texto blanco sobre fondo dorado (contraste insuficiente)
- Emojis en el contenido de productos o en headings de secciones formales
- Box shadows oscuras o dramáticas

## Accesibilidad

- Ratio de contraste mínimo: WCAG AA (4.5:1 para texto normal)
- `--foreground` (#1A1918) sobre `--background` (#FFFFFF): ratio ~19:1 ✅
- `--accent` (#C5A059) sobre `--color-primary` (#1B271C): ratio ~5.1:1 ✅
- `--accent` (#C5A059) sobre `--background` (#FFFFFF): ratio ~2.8:1 ⚠️ — usar solo en textos grandes (>24px) o decorativos
