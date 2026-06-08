---
name: Gantry
description: Invisible infrastructure for AI — LLM cost, token, and latency observability.
colors:
  void-slate: "#0B0F14"
  surface-1: "#1A1F26"
  surface-2: "#21272F"
  surface-3: "#2A313A"
  surface-inset: "#070A0E"
  signal-green: "#00E599"
  signal-green-600: "#00C985"
  signal-green-700: "#00A06B"
  signal-green-ink: "#06231A"
  text-primary: "#FFFFFF"
  text-secondary: "#FFFFFFC7"
  text-tertiary: "#FFFFFF8F"
  text-muted: "#FFFFFF61"
  border-default: "#FFFFFF14"
  border-strong: "#FFFFFF24"
  warning: "#F5B544"
  error: "#FF5C5C"
typography:
  display:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "0.005em"
  title:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sharp: "2px"
  card: "3px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.signal-green-ink}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.signal-green-600}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "36px"
  button-lg:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.signal-green-ink}"
    rounded: "{rounded.sharp}"
    padding: "0 24px"
    height: "44px"
---

# Design System: Gantry

## 1. Overview

**Creative North Star: "The Instrument Layer"**

Gantry's design system is the substrate beneath the stack: invisible until you need it, then unmistakably precise. Every token, rule, and component derives from one premise — the interface is infrastructure. It does not perform. It does not decorate. It measures.

The dominant surface is Void Slate (#0B0F14), the near-absolute dark against which Signal Green (#00E599) reads as a live telemetry pulse. Blueprint grid lines appear at 9% opacity across hero sections to suggest a coordinate system without naming one. Corner brackets mark boundaries as a surveyor marks a site. The vocabulary is borrowed from precision instruments: tick marks, readings, traces, output lines. Type is monospace when it is data and sans-serif when it is prose — the distinction is never ambiguous.

This system explicitly rejects the three registers that currently pollute AI tooling: Generic AI SaaS (purple gradients, glowing orb hero sections, particle mesh, vague "supercharge your AI" copy), Startup Hustle (testimonial carousels, emoji in headings, unverified social proof badges), and Enterprise Heavy (navy/white palette, compliance logo grids, white-paper lead capture, sales-speak phrases). Gantry is developer-led and earns attention through specificity — real numbers, real code — not enthusiasm.

**Key Characteristics:**
- Near-absolute dark background with five tonal surface steps for depth
- Single saturated accent (Signal Green) used sparingly as a live-data signal — never decorative
- Monospace type for all data output; display/body pair for headings and prose
- 2-3px corner radii throughout — machined, not rounded
- Blueprint aesthetic: hairline grids, corner brackets, coordinate labels
- Motion measured in milliseconds, state changes only; 180ms standard duration

## 2. Colors: The Signal-on-Dark Palette

One saturated signal against near-absolute dark. Color is functional, not atmospheric. The palette has no warm or cool tilt; the tint direction is signal green toward the cool-neutral band.

### Primary
- **Signal Green** (#00E599): The live telemetry output. Used for accent elements, active states, success indicators, the pulse `.pip` status dot, and data highlights in code blocks. Never used as a background except on primary buttons. Its rarity on any given screen is the point — see The Signal Scarcity Rule below.
- **Signal Green 600** (#00C985): Hover state for Signal Green background elements only (primary buttons, green chips on hover).
- **Signal Green 700** (#00A06B): Active/pressed state for Signal Green background elements.
- **Signal Green Ink** (#06231A): Text color for elements rendered on a Signal Green background (primary buttons). Near-black with a green tint; never use on dark surfaces.

### Neutral
- **Void Slate** (#0B0F14): The deepest surface. Page body background. Sets the register for every surface above it.
- **Surface 1** (#1A1F26): Cards, editor chrome, nav background (at 72% opacity with blur). First tonal step above Void Slate.
- **Surface 2** (#21272F): Hover state for Surface 1 elements. Active code editor tabs. Second tonal step.
- **Surface 3** (#2A313A): Tag/chip backgrounds, scrollbar thumbs. Third tonal step.
- **Surface Inset** (#070A0E): Code block interiors, install pill background. Deeper than Void Slate for elements that read as recessed.

### Text Ramp
- **Text 0** (#FFFFFF): Primary headings, active states, critical labels. Full white.
- **Text 1** (rgba(255,255,255,0.78)): Body copy, secondary headings, lead paragraphs.
- **Text 2** (rgba(255,255,255,0.56)): Supporting copy, feature descriptions. Minimum for body-size text (passes WCAG AA on Void Slate).
- **Text 3** (rgba(255,255,255,0.38)): Labels, coordinate markers, placeholder text, blueprint hairlines. Acceptable only for non-body text ≥11px with letter-spacing.
- **Text 4** (rgba(255,255,255,0.24)): Decorative dividers and hairlines only. Never used for readable copy.

### Status
- **Warning** (#F5B544): Cost-overrun flags, alert states. Also used for numeric value tokens in syntax highlighting.
- **Error** (#FF5C5C): Failure states, error badges.

### Named Rules
**The Signal Scarcity Rule.** Signal Green appears on ≤15% of any screen. Its rarity is what makes it mean "live data." When Signal Green loses rarity, it becomes wallpaper. If you count more than three distinct Signal Green elements in a single viewport, remove the least critical one.

**The Text Floor Rule.** The floor for body-size text is Text 2 on a Void Slate background (measured contrast ≥4.5:1). Text 3 is permitted only for labels and coordinate markers rendered in monospace at ≥11px with wide letter-spacing. Text 4 is never for reading.

## 3. Typography: Precision over Personality

**Display Font:** Space Grotesk (fallback: system-ui, sans-serif)
**Body Font:** Inter (fallback: system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (fallback: monospace)

**Character:** Space Grotesk reads as engineered — not decorative grotesque, not corporate sans. It has enough personality to carry a brand at 60px without becoming editorial. Inter at 14px is pure utility: legible under density, invisible as a system. JetBrains Mono for labels and coordinates reads as output, not ornament — monospace as instrument readout, not as aesthetic statement.

### Hierarchy
- **Display** (Space Grotesk, 600, 60px, line-height 1.02, letter-spacing -0.005em): Hero headings only. One per page. `text-wrap: balance`.
- **Headline** (Space Grotesk, 600, 40px, line-height 1.08, letter-spacing 0.005em): Section headings (h2). Max-width 720px. `text-wrap: balance`.
- **Title** (Space Grotesk, 600, 18px, line-height 1.3): Feature card headings, advisor sub-headings, step labels.
- **Lead** (Inter, 400, 18-19px, line-height 1.55, Text 1): Hero subheading and section intro copy. Max-width 600px. `text-wrap: pretty`.
- **Body** (Inter, 400, 14px, line-height 1.5, Text 1-2): All prose. Max line length ~600px (approx 75ch at 14px). `text-wrap: pretty`.
- **Label** (JetBrains Mono, 500, 11px, letter-spacing 0.14-0.18em, uppercase, Text 3): Section coordinate markers, status text, nav links (12px), data sub-labels.
- **Code** (JetBrains Mono, 400-500, 13px, line-height 1.7): Code blocks, install pills, output strips.

### Named Rules
**The Mono-as-Instrument Rule.** JetBrains Mono is used exclusively for data output: labels, coordinates, nav links, code, status messages. It is never used for headings or prose paragraphs. When the reader sees monospace, they are reading a measurement or an identifier — not a sentence.

**The Heading Ceiling Rule.** Display headings cap at 60px. Section headings cap at 40px. The page does not shout. Letter-spacing floor on display: -0.005em (≥ -0.04em absolute minimum). Anything tighter crowds letters without gaining density.

## 4. Elevation

Tonal stepping is the primary depth mechanism. Shadows are structural and reserved for physically elevated surfaces; they are not decorative signals of importance.

Five background tiers define the coordinate system: Surface Inset (#070A0E) → Void Slate (#0B0F14) → Surface 1 (#1A1F26) → Surface 2 (#21272F) → Surface 3 (#2A313A). An element sits visually above another by virtue of its surface tier, not its shadow value. A card on Surface 1 atop a Void Slate page reads as elevated without any shadow.

Shadows appear only when an element is physically detached from the document flow (the editor card, the browser mockup frame, modal-level surfaces) or when an accent glow is needed to signal the active product boundary.

### Shadow Vocabulary
- **Subtle** (`0 1px 2px rgba(0,0,0,0.4)`): Micro-lift for small interactive states. Rarely used.
- **Elevated** (`0 4px 12px rgba(0,0,0,0.45)`): Floating elements, dropdown-level surfaces.
- **High** (`0 12px 32px rgba(0,0,0,0.55)`): The code editor card, the browser mockup frame — the primary product showcase containers.
- **Accent Glow** (`0 0 0 1px rgba(0,229,153,0.28), 0 8px 28px rgba(0,229,153,0.18)`): Used on exactly one featured-boundary element per screen (the advisor card, the browser frame highlight). Never applied generically.

### Named Rules
**The Flat-by-Default Rule.** Cards, rows, and list items are flat at rest. A shadow does not appear because something is important; it appears because something is physically lifted. Importance is signaled by Signal Green, not by blur radius.

## 5. Components

Controls behave like hardware switches: intentional, state-driven, with transitions that leave no ambiguity about what happened. Every interactive element reports its state clearly. No hover that feels like an accident. No animation that outruns its function.

### Buttons
- **Shape:** Sharp (2px radius). No rounding above 2px on any button at any size.
- **Primary:** Signal Green background (#00E599), Signal Green Ink text (#06231A). Padding 0 16px, height 36px, font-weight 600. Hover: Signal Green 600 (#00C985) + `0 4px 16px rgba(0,229,153,0.22)` glow. Active: Signal Green 700 (#00A06B) + `translateY(0.5px)`. Pick one depth signal: the glow suffices — no additional border on primary.
- **Secondary:** Transparent background, Text 0 color, `border: 1px solid rgba(255,255,255,0.14)`. Hover: Surface 2 background, border shifts to Text 3. No shadow.
- **Ghost:** Transparent, Text 1. Hover: Surface 2 background, Text 0. No border, no shadow.
- **Large (lg):** Height 44px, font-size 16px, padding 0 24px. Same radius and color rules.
- **Small (sm):** Height 30px, font-size 13px, padding 0 12px.
- **Transition:** `background, border-color, transform, box-shadow` at 180ms `cubic-bezier(0.22,0.61,0.36,1)`.

### Navigation
- **Container:** Sticky top, height 60px. `background: rgba(11,15,20,0.72)`, `backdrop-filter: blur(16px)`. Bottom border: 1px `rgba(255,255,255,0.09)` (hairline).
- **Links:** JetBrains Mono, 12px, Text 2 at rest. Letter-spacing 0.04em. Hover: Text 0 + Surface 2 background tint, 2px radius, 7px vertical padding. Transitions at 150ms.
- **GitHub badge:** Mono 12px, Border Strong border, 2px radius. Star icon in Signal Green.
- **Brand mark:** Horizontal SVG logo — icon mark (44×44 viewport clipped) + "GANTRY" wordmark, rendered white on dark nav.

### Code Editor Card

The signature component. Represents Gantry's core output channel: the code that replaced three setup files.

- **Container:** Surface Inset background (#070A0E), Border Strong border (`rgba(255,255,255,0.14)`), 3px radius, High shadow (`0 12px 32px rgba(0,0,0,0.55)`). Overflow hidden.
- **Tab bar:** Surface 1 background, hairline bottom border. Tabs in JetBrains Mono 12px; active on Surface 2 with Text 0; inactive Text 3. Transition: 150ms.
- **Code area:** 20px padding, 13px JetBrains Mono, line-height 1.7, Text 1 base.
- **Syntax roles:** Keywords `#C792EA`, Strings/accent values `#00E599` (Signal Green), Comments Text 3, Functions `#82AAFF`, Punctuation Text 2, Numeric values/names `#F5B544` (Warning).
- **Output strip:** 1px dashed hairline top border, `rgba(0,229,153,0.03)` Signal Green tint background. Success text in Signal Green; metadata in Text 2.

### Cards / Containers
- **Corner Style:** Sharp (2px standard, 3px for the largest containers). Never exceed 3px.
- **Background:** Surface 1 (#1A1F26) at rest. Hover: transitions to Surface 2 (#21272F) over 200ms.
- **Shadow:** Flat by default. High shadow only for editor/browser frame. Accent Glow for one featured-boundary element per screen.
- **Border:** Border Default (`rgba(255,255,255,0.08)`) for standard containers; Border Strong (`rgba(255,255,255,0.14)`) for featured containers. Accent Line (`rgba(0,229,153,0.28)`) for the one Signal-Green-bordered element per screen.
- **Internal Padding:** 28px standard feature card; 40px advisor/spotlight card.

### Blueprint Frame
A signature framing device: 7×7px corner brackets at each corner of a key container.

- **Marks:** `border: 1px solid rgba(255,255,255,0.42)`. Each corner exposes two sides only (top+left, top+right, bottom+left, bottom+right) via selective border properties.
- **Usage:** Sparingly — on one or two high-value data containers per section as a precision signal. Overuse collapses the instrument metaphor into decorative pattern.

### Section Coordinate Markers
Used once per section as a location identifier in the page document.

- **Format:** `[accent index number]` + `[mono label]` + hairline rule extending full-width.
- **Index:** JetBrains Mono 11px, Signal Green.
- **Label:** JetBrains Mono 11px, uppercase, letter-spacing 0.18em, Text 3.
- **Rule:** 1px `rgba(255,255,255,0.09)`.

### Model Advisor Card
A featured spotlight component with the Accent Glow border. One per page.

- **Container:** Surface 1 background, `border: 1px solid rgba(0,229,153,0.28)`, 3px radius, Accent Glow shadow, 40px padding. Two-column grid.
- **Headline figure:** JetBrains Mono, 64px, 600, Signal Green, letter-spacing -0.03em. The cost-savings number — the one place a large mono figure is deliberate.
- **Bar chart:** Horizontal bars with dashed separator hairlines. Bar fill in accent/warning/neutral per model tier. Model name in Space Grotesk 14px; sub-label in JetBrains Mono 9px Text 3 (or Signal Green for recommended tier).

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Green for live data, active states, and success signals. Reserve it — its scarcity makes it trustworthy.
- **Do** step through the five background tiers (Surface Inset → Void Slate → Surface 1 → Surface 2 → Surface 3) to create depth without decorative shadows.
- **Do** keep border-radius at 2px for interactive elements (buttons, inputs, nav items) and 3px maximum for large containers. Sharp edges signal precision.
- **Do** write copy in developer vocabulary: specific nouns, concrete verbs, real numbers. "Wrap your model client in one line" beats "streamline your AI infrastructure."
- **Do** use JetBrains Mono exclusively for data output: labels, coordinates, code, status messages. Never for prose.
- **Do** test body text (Text 2, rgba 0.56 on Void Slate) for WCAG AA contrast before shipping. Bump to Text 1 if any doubt.
- **Do** apply the Accent Glow to one featured-boundary element per screen — the browser frame or advisor card, not both, not three.
- **Do** include `@media (prefers-reduced-motion: reduce)` for every animation: opacity crossfade or instant transition as the alternative.
- **Do** use `text-wrap: balance` on h1 and h2 and `text-wrap: pretty` on long prose blocks.

### Don't:
- **Don't** use purple gradients, glowing orb hero sections, particle mesh backgrounds, or animated abstract blobs. Gantry is an engineering tool, not a vibe. (Anti-reference: Generic AI SaaS.)
- **Don't** add emoji to headings, use confetti effects, or show testimonial carousels. Engineers distrust that register. (Anti-reference: Startup Hustle.)
- **Don't** use navy/white corporate palette, compliance logo grids, or phrasing like "enterprise-grade," "mission-critical," or "next-generation." (Anti-reference: Enterprise Heavy.)
- **Don't** pair a `1px border` with a `box-shadow` blur ≥16px on the same element. Pick one depth signal per element.
- **Don't** increase border-radius above 3px on any card or container. 8px, 12px, 16px radii belong to a different visual vocabulary. 24px+ is prohibited.
- **Don't** apply `background-clip: text` with a gradient. Solid Signal Green at weight 600 carries emphasis without decoration.
- **Don't** put a monospace eyebrow above every section as structural scaffolding. Section coordinate markers are a location identifier used once per section — they are not decorative eyebrows.
- **Don't** write aphoristic-cadence copy ("serious statement, then punchy short negation"). If three section copy blocks on the page follow that rhythm, rewrite. Specific, not aphoristic.
- **Don't** use "streamline," "empower," "supercharge," "leverage," "unleash," "transform," "seamless," "world-class," or "cutting-edge." Pick a specific noun and a verb that describes what Gantry literally does.
- **Don't** use Signal Green as a surface background for non-button elements. It is a signal color, not a fill color.
