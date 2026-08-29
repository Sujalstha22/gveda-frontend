<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GVEDA Brand & Frontend Engineering Constitution
> **Brand Promise**: *“Botanical Science for Modern Skin”*  
> **Source Guidelines**: GVEDA Basic Brand Guidelines v1.2  
> **Target Feeling**: Premium • Minimal • Elegant • Trustworthy • Timeless • Calm  

---

## 1. Core Philosophy: Premium Through Restraint

When designing or coding any component, page, or interaction for GVEDA, never ask:
> ❌ *"How can I make this section visually complex or flashier?"*

Always ask:
> ✅ *"How can I make this section feel premium without adding unnecessary things?"*  
> ✅ *"Can something be removed to improve the clarity and elegance?"*

GVEDA creates luxury and trust through **generous whitespace, flawless alignment, product-first visuals, and editorial typography**.

---

## 2. Official Color System & The 90/10 Rule

GVEDA does **not** use traditional loud brand colors (no bright blues, reds, or vibrant greens). The brand identity is built on a quiet, high-contrast, warm architectural palette.

| Token | Name | HEX | Usage |
| :--- | :--- | :--- | :--- |
| `--warm-ivory` / `--background` | **Warm Ivory** | `#F7F5F1` | Primary website background, presentations, brand environment |
| `--soft-white` / `--surface` | **Soft White** | `#FAFAF8` | Cards, packaging base, clean content containers |
| `--rich-black` / `--foreground` | **Rich Black** | `#111111` | Primary typography, wordmark logo, icons, dark buttons |
| `--botanical-gold` / `--secondary` | **Botanical Gold** | `#BD9F7D` | Signature leaf icon, subtle dividers, delicate accents |

### 📐 The 90 / 10 Proportion Rule
* **90% White / Warm Ivory canvas**: Immense breathing room and spaciousness.
* **10% Rich Black + Muted Botanical Gold**: Sharp typography and restrained details.
* *Never create equal color weight (e.g., 40% ivory + 30% gold + 30% black is strictly forbidden).*

---

## 3. Strict "DO NOT ADD" (Anti-Patterns & Banned Elements)

Any agent or developer working on GVEDA **MUST NEVER** introduce:

* ❌ **NO Gradients**: Never use `background: linear-gradient(...)` or shiny gradient fills for brand identity or text highlights. Use flat `#BD9F7D` for Botanical Gold.
* ❌ **NO Metallic / Foil Simulation**: No chrome, gold foil, glitter, or skeuomorphic metallic effects.
* ❌ **NO Bright / Saturated Accent Colors**: No electric greens, loud blues, neon highlights, or bright discount reds.
* ❌ **NO Clutter or Jungle Graphics**: No giant decorative palm leaves, oversized plant textures, or busy botanical wallpaper.
* ❌ **NO Badges / Sticker Overload**: No 10 trust badges, floating discount tags, or cluttered star counters.
* ❌ **NO Heavy Shadows**: Avoid dark, blurry drop shadows (`box-shadow: 0 20px 50px rgba(0,0,0,0.5)`). Use only ultra-soft, low-opacity botanical shadows.
* ❌ **NO Jarring Animations**: Avoid bouncing buttons, spinning elements, or frantic motion. Use only smooth, controlled easing (0.2s - 0.5s cubic bezier).
* ❌ **NO Urgent / Fear-Based Copy**: Never write sensational claims (*"YOUR SKIN IS DAMAGED!"*, *"BUY NOW BEFORE IT'S TOO LATE!"*, *"50% OFF FLASH SALE!"*).
* ❌ **NO Editorial Font Misuse**: Never use the secondary font (*Cormorant Garamond*) on buttons, navigation links, product titles, body copy, or packaging front panels.
* ❌ **NO Logo Tampering**: Never apply CSS filters (`filter: drop-shadow`, `filter: hue-rotate`), borders, outlines, or stretching to the GVEDA logo. Keep the official logo unaltered.

---

## 4. Strict "WHAT TO USE" (Design System & Aesthetics)

* ✅ **Whitespace is a First-Class Design Element**: Whitespace gives luxury and calm. Embrace large empty gaps and breathing margins.
* ✅ **Product-First Visuals**: High-resolution, clean product photography is always the hero. Clean shot → Short headline → Minimal supporting copy → Single CTA.
* ✅ **Subtle Botanical Illustrations**: If botanical graphics are used, use only delicate, thin-line minimalist botanical vector drawings.
* ✅ **Clean Architectural Grids**: Balanced columns, generous gutters, and strong geometric alignment.
* ✅ **Controlled Rounded UI**: Subtle pill shapes for interactive tags/buttons (`rounded-full`) or refined corner radii (`rounded-md` / `rounded-lg`).
* ✅ **Subtle Dividers**: Thin, faint lines (`border-t border-border` or `border-border-gold`) to separate editorial sections cleanly.

---

## 5. Typography Hierarchy

Fonts are stored locally in `/public/fonts/` (`Montserrat` & `Cormorant_Garamond`).

### 🅰️ Primary Typeface: Montserrat (90%+ of all text)
* **H1 Headings**: Bold (`font-weight: 700`, `font-family: var(--font-heading)`)
* **H2 Headings**: SemiBold (`font-weight: 600`)
* **H3 / H4 Headings**: Medium (`font-weight: 500`)
* **Body Copy / Paragraphs**: Regular (`font-weight: 400`, `line-height: 1.7`)
* **Captions / Eyebrows / Subtitles**: Light (`font-weight: 300`, `letter-spacing: 0.15em`, `uppercase`)

### 🅱️ Secondary Typeface: Cormorant Garamond (Editorial Accent Only)
* **Role**: Emotional, editorial accent for a special touch.
* **Usage Limit**: Strictly reserved for **1 highlighted word** or a short **3–6 word phrase** (e.g., *“Botanical skincare / <span className="font-editorial">for modern skin</span>.”*).
* **Class**: `font-editorial` or `text-editorial` (`font-family: "Cormorant Garamond", Georgia, serif; font-style: italic;`).

---

## 6. Tone of Voice & Copywriting Standards

GVEDA speaks with quiet authority, scientific precision, and soothing botanical honesty:
* **Educational**: Inform the user about ingredients and skin biological synergy.
* **Honest**: Clear, science-grounded claims without hyperbole.
* **Calm**: Relaxing, measured, and welcoming.
* **Premium**: Sophisticated, understated language.

| ❌ AVOID (Desperate / Loud) | ✅ PREFERRED (GVEDA Standard) |
| :--- | :--- |
| *"BEST SKINCARE IN THE WORLD 50% OFF TODAY!"* | *"Thoughtfully formulated for modern skin."* |
| *"CURE WRINKLES IN 3 DAYS OR MONEY BACK!"* | *"Powered by botanical ingredients and modern science."* |
| *"BUY NOW BEFORE STOCK RUNS OUT!"* | *"Discover the daily botanical ritual."* |

---

## 7. The GVEDA Test (QA Checklist)

Before merging any code or finalizing any design, run this 6-point checklist:

1. **Does it look premium?** (High-end, refined, luxurious)
2. **Is there enough whitespace?** (Does the layout breathe freely?)
3. **Does it feel calm rather than busy?** (Zero visual noise or frantic triggers)
4. **Can something be removed to improve it?** (Simplicity through subtraction)
5. **Would it still look modern in five years?** (Timeless architectural minimalism)
6. **Does it instantly feel like GVEDA?** (Warm Ivory + Rich Black + Botanical Gold + Editorial restraint)
