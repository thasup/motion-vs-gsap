export function Philosophy() {
  return (
    <section style={{ padding: '5rem 0 3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Core Principles</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
          Two philosophies.<br />
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.65em' }}>Same goal, opposite approach.</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: '3rem' }}>
        {/* Framer */}
        <div style={{ background: 'var(--surface)', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--framer)' }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, color: 'var(--framer-light)', fontWeight: 600 }}>
              Framer Motion
            </span>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            "Motion is a React side-effect"
          </h3>

          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Framer Motion extends React's declarative model to include motion. You describe
            <em> what state looks like</em> — Framer computes how to get there. Animation
            is just a styled version of state change.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Mental model', 'Declarative — describe the destination'],
              ['Trigger', 'State change, presence, scroll position'],
              ['API surface', 'JSX props: animate, initial, exit, whileHover'],
              ['Learning curve', 'Gentle — feels like styled-components for motion'],
              ['Scope', 'React-only, first-class TypeScript'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                <span style={{ color: 'var(--text-dim)', fontFamily: "'JetBrains Mono'", fontSize: 11, width: 110, flexShrink: 0, paddingTop: 2 }}>{k}</span>
                <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GSAP */}
        <div style={{ background: 'var(--surface)', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gsap)' }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, color: 'var(--gsap-light)', fontWeight: 600 }}>
              GSAP
            </span>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            "The DOM is the canvas"
          </h3>

          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            GSAP gives you a timeline — a precise, scrubable sequence of tweens.
            You control <em>exactly</em> when each property changes, by how much, and in what order.
            Coordination is explicit, not inferred.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Mental model', 'Imperative — describe the journey'],
              ['Trigger', 'Anything: events, scroll, timers, callbacks'],
              ['API surface', 'gsap.to(), gsap.timeline(), ScrollTrigger'],
              ['Learning curve', 'Steeper — but timeline thinking is transferable'],
              ['Scope', 'Framework-agnostic, vanilla JS native'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                <span style={{ color: 'var(--text-dim)', fontFamily: "'JetBrains Mono'", fontSize: 11, width: 110, flexShrink: 0, paddingTop: 2 }}>{k}</span>
                <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key insight callout */}
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-2)',
        borderRadius: 10,
        padding: '1.5rem 2rem',
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}>
        <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚡</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 4 }}>
            The fundamental difference
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Framer Motion asks: <span style={{ color: 'var(--framer-light)' }}>"what should this component look like in each state?"</span>{' '}
            GSAP asks: <span style={{ color: 'var(--gsap-light)' }}>"what sequence of property changes should happen, and when?"</span>{' '}
            Both produce animation — but they encode fundamentally different models of causality.
            React teams feel at home in Framer. Complex orchestration feels natural in GSAP.
          </p>
        </div>
      </div>
    </section>
  )
}
