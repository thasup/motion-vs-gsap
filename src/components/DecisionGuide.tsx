function CheckItem({ text, color }: { text: string; color: string }) {
  return (
    <div className="check-item">
      <div
        className="check-icon"
        style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}
      >
        ✓
      </div>
      <span style={{ color: 'var(--text)', fontSize: 13.5, lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

function XItem({ text, color }: { text: string; color: string }) {
  return (
    <div className="check-item">
      <div
        className="check-icon"
        style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', color: '#ff6060' }}
      >
        ✗
      </div>
      <span style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

const framerWhen = [
  'Building a React application (Next.js, Remix, Vite)',
  'Your team thinks in components and state',
  'You need AnimatePresence for route/modal transitions',
  'Gesture interactions (drag, hover, tap) are central to the UX',
  'Most animations are entrance/exit or state-driven',
  'You want full TypeScript coverage with minimal boilerplate',
  'Team onboarding speed matters more than raw capability',
]

const framerNot = [
  'Complex scroll narratives (scrollytelling, pinned sections)',
  'Animating elements along SVG paths',
  'Multi-step timelines that need scrub/seek/pause',
  'Non-React environments (Vue, Svelte, vanilla JS)',
  'Performance-critical animations on low-end devices with large lists',
]

const gsapWhen = [
  'Complex scroll-driven experiences (scrollytelling, horizontal scroll)',
  'You need timeline scrubbing — e.g. scroll-linked playback',
  'Multi-step sequences with precise timing offsets',
  'Animating elements along SVG paths (MotionPath)',
  'Working outside React, or across frameworks on the same project',
  'You need the absolute best performance on all devices',
  'Producing marketing/editorial pages with cinematic animation',
]

const gsapNot = [
  'Simple React apps where state-driven animation suffices',
  'Small bundle size is a hard constraint',
  'Team has no JS animation experience and timeline model is unfamiliar',
  'You need AnimatePresence-style unmount animations without extra wiring',
]

export function DecisionGuide() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Decision Guide</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
          When to reach for which
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8, maxWidth: 560, margin: '8px auto 0' }}>
          Neither library is universally better. The right tool depends on your animation complexity, team context, and whether you're in React or not.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Framer card */}
        <div className="decide-card dc-framer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--framer-dim)', border: '1px solid rgba(124,90,243,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14 }}>F</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '1rem', color: 'var(--framer-light)' }}>
                Choose Framer Motion
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)' }}>
                framer-motion@12
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 10 }}>
              ✓ GOOD FIT
            </div>
            {framerWhen.map(t => <CheckItem key={t} text={t} color="var(--framer)" />)}
          </div>

          <div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 10 }}>
              ✗ NOT IDEAL FOR
            </div>
            {framerNot.map(t => <XItem key={t} text={t} color="var(--framer)" />)}
          </div>
        </div>

        {/* GSAP card */}
        <div className="decide-card dc-gsap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gsap-dim)', border: '1px solid rgba(136,206,2,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, color: 'var(--gsap-light)' }}>G</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '1rem', color: 'var(--gsap-light)' }}>
                Choose GSAP
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)' }}>
                gsap@3
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 10 }}>
              ✓ GOOD FIT
            </div>
            {gsapWhen.map(t => <CheckItem key={t} text={t} color="var(--gsap)" />)}
          </div>

          <div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 10 }}>
              ✗ NOT IDEAL FOR
            </div>
            {gsapNot.map(t => <XItem key={t} text={t} color="var(--gsap)" />)}
          </div>
        </div>
      </div>

      {/* Bottom recommendation */}
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-2)',
        borderRadius: 10,
        padding: '2rem',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 12 }}>
          The practical recommendation
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--framer-light)', marginBottom: 8 }}>
              For 80% of React teams
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              Start with Framer Motion. The API fits naturally into the React mental model,
              onboarding is fast, and it covers virtually all standard product animation needs —
              transitions, gestures, scroll reveals, and list mutations.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: 'var(--gsap-light)', marginBottom: 8 }}>
              For cinematic or cross-stack work
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              Reach for GSAP when animation complexity is the product — scrollytelling,
              editorial pages, interactive data stories, or any multi-framework environment.
              The timeline model pays dividends at scale.
            </p>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--text)' }}>They can coexist.</strong>{' '}
          Use Framer Motion for component-level UI animation and GSAP for complex scroll sequences
          or marketing sections. The two libraries operate at different layers and rarely conflict.
        </div>
      </div>
    </div>
  )
}
