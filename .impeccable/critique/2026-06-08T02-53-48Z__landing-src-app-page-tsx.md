---
target: landing/src/app/page.tsx
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-06-08T02-53-48Z
slug: landing-src-app-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | CountUp flashes "0%" on hydration; pip is a nice live signal but no loading states |
| 2 | Match System / Real World | 3 | Developer vocabulary well-matched |
| 3 | User Control and Freedom | 2 | All CTAs dead; no mobile nav after 980px |
| 4 | Consistency and Standards | 3 | Visual system cohesive; section markers break cadence on Stats/FinalCTA |
| 5 | Error Prevention | 3 | Marketing page; CopyButton handles gracefully |
| 6 | Recognition Rather Than Recall | 3 | Install command visible; anchor links work on desktop |
| 7 | Flexibility and Efficiency | 2 | Mobile navigation removed with no hamburger replacement |
| 8 | Aesthetic and Minimalist Design | 3 | Focused, no clutter; feature footer metrics differentiate cards |
| 9 | Error Recovery | 3 | N/A for marketing page |
| 10 | Help and Documentation | 2 | "Read the docs" is dead |
| **Total** | | **26/40** | **Acceptable** |

## Anti-Patterns Verdict
Escapes first-order slop: no gradient text, no glowing orbs, no identical card grids. Second-order risk: Inter + Space Grotesk are both on brand.md's reflex-reject list. One real detector finding: 5 em dashes in body copy. One false positive: stats column divider flagged as side-tab.

## What's Working
1. Model Advisor section — two-column layout with cost bars and inline eval scores sells through specificity.
2. Feature card footer lines — "$0.019 / call · live" and "−$10,700 / mo · recommended" are concrete and trust-building.
3. Hero integration surface — tabbed code editor + install pill + working copy button is a coherent developer onboarding signal.

## Priority Issues
- [P1] Mobile navigation removed at 980px with no hamburger replacement
- [P1] All CTAs are dead links (href="#")
- [P1] ScrollReveal + CountUp have no prefers-reduced-motion fallback (WCAG 2.3.3)
- [P2] 5 em dashes in body copy (detector confirmed)
- [P2] Footer blurb at rgba(255,255,255,0.38) on #0B0F14 = ~3.94:1, fails WCAG AA for 13px text

## Persona Red Flags
Jordan: cannot convert — every CTA dead. Riley: fictional logo strip + hardcoded star count = prototype tell. Casey: no mobile nav, no hamburger. Developer AI engineer: dead CTAs + CSS-placeholder logos collapse trust.

## Minor Observations
CountUp useState(0) flash; missing text-wrap:balance/pretty; hexagon used as lock icon; table missing caption/scope; section marker cadence inconsistent; no rel="noopener noreferrer" on external links.
