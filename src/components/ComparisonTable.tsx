function Score({ framer, gsap: gsapScore }: { framer: number; gsap: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 60, fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--framer-light)' }}>
          framer
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 9, height: 9, borderRadius: '50%',
                background: i < framer ? 'var(--framer)' : 'var(--border-2)',
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 60, fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--gsap-light)' }}>
          gsap
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 9, height: 9, borderRadius: '50%',
                background: i < gsapScore ? 'var(--gsap)' : 'var(--border-2)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 10,
      fontFamily: "'JetBrains Mono'",
      background: `${color}18`,
      border: `1px solid ${color}44`,
      color,
      marginRight: 4,
      marginBottom: 4,
    }}>
      {text}
    </span>
  )
}

const rows = [
  {
    category: 'Bundle size',
    framer: 3,
    gsap: 4,
    framerDetail: '~45 kB gzipped (full). Use framer-motion/dom for ~18 kB.',
    gsapDetail: '~24 kB core gzipped. Plugins are additive (ScrollTrigger +8 kB).',
  },
  {
    category: 'React integration',
    framer: 5,
    gsap: 3,
    framerDetail: 'First-class. Hooks, variants, AnimatePresence — all React-native.',
    gsapDetail: 'Works fine with refs + useEffect, but no React-specific API.',
  },
  {
    category: 'Timeline control',
    framer: 2,
    gsap: 5,
    framerDetail: 'useAnimate provides sequences but no scrubbing or seek().',
    gsapDetail: 'Scrub, seek, pause, reverse, timeScale — full playback control.',
  },
  {
    category: 'Scroll animations',
    framer: 3,
    gsap: 5,
    framerDetail: 'useScroll + useTransform covers parallax and progress. No pinning.',
    gsapDetail: 'ScrollTrigger: pin, scrub, snap, horizontal, batch — industry standard.',
  },
  {
    category: 'Gesture / drag',
    framer: 5,
    gsap: 4,
    framerDetail: 'drag, whileDrag, dragConstraints — zero config, physics-aware.',
    gsapDetail: 'Draggable plugin: more control, hit testing, rotation types, snap.',
  },
  {
    category: 'SVG animation',
    framer: 4,
    gsap: 5,
    framerDetail: 'pathLength, pathOffset native. No motion-along-path.',
    gsapDetail: 'MotionPath plugin: animate elements along paths. Full SVG control.',
  },
  {
    category: 'Learning curve',
    framer: 4,
    gsap: 3,
    framerDetail: 'Gentle for React devs. Props-based API is intuitive.',
    gsapDetail: 'Steeper. Timeline thinking takes time, but transfers to all projects.',
  },
  {
    category: 'Performance',
    framer: 3,
    gsap: 5,
    framerDetail: 'Good for most cases. Re-renders can be an issue in large lists.',
    gsapDetail: 'WAAPI-accelerated, GPU compositing, minimal GC pressure. Industry best.',
  },
  {
    category: 'Framework agnostic',
    framer: 1,
    gsap: 5,
    framerDetail: 'React-only. No Vue, Svelte, or vanilla JS support.',
    gsapDetail: 'Works with anything that has a DOM. Framework-independent.',
  },
  {
    category: 'TypeScript support',
    framer: 5,
    gsap: 4,
    framerDetail: 'Excellent. Full type inference, variants type-safe.',
    gsapDetail: 'Good. Types available, but plugin types can lag slightly.',
  },
  {
    category: 'Animation exit',
    framer: 5,
    gsap: 2,
    framerDetail: 'AnimatePresence handles unmount animations natively.',
    gsapDetail: 'Requires manual timing delays before DOM removal. More complex.',
  },
  {
    category: 'License',
    framer: 3,
    gsap: 4,
    framerDetail: 'MIT open source.',
    gsapDetail: 'Standard license: free for most use. Some plugins need Club GSAP.',
  },
]

export function ComparisonTable() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Feature Matrix</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>Head-to-head</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>
          Scores are relative to each library's own best-in-class capability, not absolute quality.
        </p>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        <table className="cmp-table">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Score</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.category}>
                <td>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: 'var(--text-muted)' }}>
                    {row.category}
                  </span>
                </td>
                <td style={{ minWidth: 160 }}>
                  <Score framer={row.framer} gsap={row.gsap} />
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--framer-light)', fontSize: 10, fontFamily: "'JetBrains Mono'", marginRight: 6 }}>FM</span>
                      {row.framerDetail}
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--gsap-light)', fontSize: 10, fontFamily: "'JetBrains Mono'", marginRight: 6 }}>GS</span>
                      {row.gsapDetail}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
