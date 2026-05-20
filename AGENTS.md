# AGENTS.md — Project Architecture

## Overview

Single-page TanStack Start (React, SSR) application. All content lives in `src/routes/index.tsx` which composes ~14 components. No data fetching, no API routes, no database.

## Key Directories

```
src/
  routes/
    __root.tsx          # HTML shell, global font/meta, noise overlay
    index.tsx           # Page composition only — imports and lays out sections
  components/
    Nav.tsx             # Sticky top nav with section anchor links
    Hero.tsx            # Full-screen split hero with live Framer/GSAP demos
    Philosophy.tsx      # Two-column philosophy comparison cards
    DemoLayout.tsx      # Reusable wrapper: 2-column demo + tabbed code block
    CodeBlock.tsx       # highlight.js syntax highlighter (Tokyo Night theme)
    ComparisonTable.tsx # 12-row feature matrix with dot-score indicators
    DecisionGuide.tsx   # When-to-use cards + practical recommendation callout
    demos/
      EntranceDemo.tsx  # Basic fade/scale/slide
      ScrollDemo.tsx    # useInView vs ScrollTrigger
      DragDemo.tsx      # Framer drag prop vs GSAP Draggable plugin
      StaggerDemo.tsx   # Variant staggerChildren vs gsap stagger config
      TimelineDemo.tsx  # useAnimate sequence vs gsap.timeline()
      SVGDemo.tsx       # pathLength vs strokeDashoffset + MotionPath
```

## Coding Conventions

- All styling via CSS variables defined in `src/styles.css` — no Tailwind utility classes used in components (pure inline styles + named class names from CSS)
- Color palette: `--framer` (#7c5af3 purple) and `--gsap` (#88ce02 lime green) are the two accent colors
- Fonts loaded via Google Fonts in `styles.css`: Syne (headings), Outfit (body), JetBrains Mono (code/labels)
- Each demo component accepts an `animKey` prop (number) to trigger re-animation via key change on replay button click
- GSAP effects use `useEffect` with `return () => tl.kill()` cleanup to prevent memory leaks
- Framer Motion components are client-only; no server-side animation state

## Non-obvious Decisions

- `DemoLayout` takes separate `framerDemo`/`gsapDemo` ReactNode props plus code strings — tab switching is local state, demos always stay mounted (avoids remount jank)
- GSAP ScrollTrigger is registered once at module scope in `ScrollDemo.tsx`; ScrollTrigger instances are killed in useEffect cleanup
- highlight.js uses modular imports (not the monolithic bundle) — only `javascript`, `typescript`, and `xml` languages are registered
- The noise overlay is a fixed `div` in `__root.tsx` — not in a scrolling container to avoid grain filter scroll performance issues
- Hero GSAP demo uses `repeat: -1` on the timeline for continuous looping, demonstrating GSAP's timeline-first philosophy in the hero
