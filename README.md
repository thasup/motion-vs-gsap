# Framer Motion vs GSAP — Animation Library Comparison

A production-quality, interactive demo site for senior frontend engineers making a tooling decision between Framer Motion and GSAP.

## What it is

A single-page reference that starts with each library's core philosophy, then walks through six concrete use cases with live running demos and side-by-side code snippets. Ends with a feature matrix and decision guide.

## Key Technologies

- **React 19** + **TanStack Start** (SSR/routing)
- **Framer Motion 12** — declarative, React-native animation library
- **GSAP 3** with ScrollTrigger and Draggable plugins
- **Tailwind CSS v4** + custom CSS variables
- **highlight.js** (Tokyo Night theme) for code syntax highlighting
- **Syne** (display) + **Outfit** (body) + **JetBrains Mono** (code) typography

## Running Locally

```bash
npm install
npm run dev        # starts on http://localhost:3000
```

## Page Structure

1. **Hero** — Split screen showing each library's philosophy in live animation
2. **Philosophy** — Side-by-side mental model comparison
3. **Entrance Animations** — Basic fade/scale/slide with replay
4. **Scroll-Triggered** — useInView vs ScrollTrigger
5. **Gesture & Drag** — Framer drag prop vs GSAP Draggable
6. **Stagger** — Variant cascading vs GSAP stagger config
7. **Complex Timelines** — useAnimate sequences vs gsap.timeline()
8. **SVG Animation** — pathLength vs strokeDashoffset + MotionPath
9. **Feature Matrix** — 12-row comparison table
10. **Decision Guide** — When to use each, with a practical recommendation
