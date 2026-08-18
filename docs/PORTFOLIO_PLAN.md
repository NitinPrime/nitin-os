# NITIN.OS — Implementation Plan

The repository was an empty git workspace. This plan defines the product, then the site is built from scratch on Next.js.

## Product thesis

NITIN.OS is not a brochure. It is a single-page engineering product with deep case-study routes. A recruiter should understand Nitin, his stack, and his proof of work in under 20 seconds, then be able to *operate* the rest of the site like a tool.

Tone: dark, editorial, technical, quiet. Apple storytelling + high-end developer tooling. Not cyberpunk, not a HUD, not a UI-kit template.

## Visual direction

| Token | Value |
| --- | --- |
| Base | `#08090c` near-black |
| Surface | `#0e1015` |
| Text | `#f3f4f6` |
| Muted | `#8b919c` |
| Line | `rgba(255,255,255,0.08)` |
| Accent | `#4d7cff` electric blue |
| Accent 2 | `#7c74ff` violet, used rarely |

Typography:

- Display: Instrument Serif (editorial headings)
- UI: Geist Sans
- System/meta: Geist Mono

Depth comes from spacing, type scale, 1px borders, slow gradient motion, and restrained blur. Cards are used only when they hold a real object (a project, a proof link). No skill bars. No neon glow text. No glass everywhere.

## Information architecture

Single home route (`/`) as the operating system. Case studies live at `/work/[slug]`. Resume lives at `/resume`.

Home scroll story:

1. Boot (first visit only)
2. Hero — identity, availability, CTAs
3. Engineering System — interactive skill graph
4. Work — featured project explorer
5. Flagship architecture — drone request flow
6. How I Think — process with real project examples
7. Experience — cinematic timeline
8. Engineering Lab — 2 playable experiments
9. Proof — GitHub, LinkedIn, resume, projects
10. About — five direct answers
11. Contact — email, LinkedIn, GitHub, phone

Persistent chrome:

- Top nav: NITIN.OS · WORK · SYSTEMS · EXPERIENCE · ABOUT · CONTACT · RESUME
- Cmd/Ctrl+K command palette
- Scroll progress on the right (desktop)

## Component architecture

```
src/
  app/                 # routes, metadata, OG image
  components/
    navigation/        # header, mobile drawer, scroll progress
    boot/              # first-visit boot sequence
    command-palette/   # fuzzy command surface
    hero/              # identity + subtle system graph
    engineering-map/   # THE ENGINE
    projects/          # explorer + featured architecture
    case-studies/      # shared case-study chrome
    thinking/          # HOW I THINK
    experience/        # timeline
    lab/               # request flow + inspect CLI
    proof/             # proof of work
    about/
    contact/
    ui/                # button, section, magnetic, reveal
  data/                # profile, projects, experience, engine, commands
  lib/                 # cn, fuzzy, motion, storage
```

Content is data-driven. Missing facts are stored as `CONTENT_NEEDED` constants, never invented.

## Animation strategy

- Motion (`motion/react`) for enter, layout, and hover. No GSAP. No Three.js.
- CSS for boot typewriter, border illumination, gradient drift.
- Native CSS View Transitions between work explorer and case studies so titles stay spatially anchored.
- Scroll-linked architecture: IntersectionObserver + sticky panels. No scroll hijacking.
- Reduced motion: skip boot, disable parallax, keep opacity/color only.
- Boot stored in `sessionStorage` so returning visitors in the same session skip it.

## Project architecture (content, not code)

Ordered by technical uniqueness:

1. **Autonomous Indoor Drone** — flagship. CV × GenAI × Robotics. Interactive pipeline: User → LLM → retrieval (FAISS) → context → ROS → drone. Qualitative outcomes only.
2. **ChiefPulse** — presented as a product. Founding Engineer. React / TypeScript / Supabase. Contribution details marked where incomplete.
3. **AI Resume Analyzer** — real AI SaaS. React + Claude. Live demo exists. Architecture and production-hardening learnings, no fake traction.
4. **URL Shortener** — backend/systems proof. Node.js, Express, MongoDB.

## Responsive strategy

Desktop: spatial graph, sticky architecture, wide type.

Tablet: graph remains, spacing compresses, architecture becomes a vertical flow.

Mobile:

- Graph becomes a selectable list with connection lines, not a cramped SVG.
- Architecture becomes a stepped list with the same illumination logic.
- Nav becomes a compact bar + full-screen menu.
- Lab experiments stack; CLI is full-width.
- Touch targets ≥ 44px. No hover-only information.

## Performance strategy

- App Router, React Server Components for static content.
- Client islands only where interaction requires it.
- `next/font` with subsetting. No extra webfonts.
- SVG/CSS visuals instead of video or 3D.
- Lazy-load Lab and case-study client islands.
- GitHub proof is static from known public data (no runtime GitHub API on first paint).
- GPU-friendly transforms only. No continuous unbounded particle loops.

## Accessibility

Semantic landmarks, skip link, visible focus rings, real buttons/links, dialog semantics on palette and mobile nav, `prefers-reduced-motion`, contrast-safe muted text (`#8b919c` on `#08090c`).

## SEO

Title: `Nitin — Software Engineer`

Description: software engineering, AI, full-stack, selected systems.

OG image generated with `opengraph-image.tsx`. JSON-LD Person. Canonical + sitemap + robots.

## Known facts vs placeholders

**Use:** Nitin S · Founding Engineer, ChiefPulse (May 2026–present) · Academic intern, NUS (GAIP Winter 2024, Deep Learning + SageMaker; CNN accident detection ~85% on live streams, TensorFlow / OpenCV / Python) · B.Tech IT, PSG College of Technology (2022–2026) · GitHub NitinPrime · LinkedIn nitin-s- · email / phone provided.

**Placeholders:** Samsung R&D role/dates/responsibilities · drone quantitative metrics · ChiefPulse user/revenue/traction · resume PDF file.

## Build sequence

1. Design system + layout
2. Boot, nav, palette
3. Hero
4. Engineering map
5. Project explorer + flagship architecture
6. Case study pages
7. Think / Experience / Lab / Proof / About / Contact
8. Mobile, a11y, SEO, polish
