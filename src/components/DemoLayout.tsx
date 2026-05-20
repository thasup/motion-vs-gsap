import { useState } from 'react'
import { CodeBlock } from './CodeBlock'

interface DemoLayoutProps {
  title: string
  subtitle: string
  number: string
  framerDemo: React.ReactNode
  gsapDemo: React.ReactNode
  framerCode: string
  gsapCode: string
  onReplayFramer?: () => void
  onReplayGsap?: () => void
}

export function DemoLayout({
  title,
  subtitle,
  number,
  framerDemo,
  gsapDemo,
  framerCode,
  gsapCode,
  onReplayFramer,
  onReplayGsap,
}: DemoLayoutProps) {
  const [activeTab, setActiveTab] = useState<'framer' | 'gsap'>('framer')

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
          <span style={{
            fontFamily: "'JetBrains Mono'",
            fontSize: 11,
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
          }}>
            {number}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>{title}</h2>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      </div>

      {/* Side-by-side demo */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        background: 'var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        <div style={{ background: 'var(--surface)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--framer)' }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: 'var(--framer-light)', letterSpacing: '0.08em' }}>
              FRAMER MOTION
            </span>
          </div>
          <div className="demo-stage" style={{ minHeight: 180 }}>
            {framerDemo}
            {onReplayFramer && (
              <button className="replay-btn" onClick={onReplayFramer}>↺ replay</button>
            )}
          </div>
        </div>

        <div style={{ background: 'var(--surface)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gsap)' }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: 'var(--gsap-light)', letterSpacing: '0.08em' }}>
              GSAP
            </span>
          </div>
          <div className="demo-stage" style={{ minHeight: 180 }}>
            {gsapDemo}
            {onReplayGsap && (
              <button className="replay-btn" onClick={onReplayGsap}>↺ replay</button>
            )}
          </div>
        </div>
      </div>

      {/* Code tabs */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
          <div className="tab-row">
            <button
              className={`tab-btn ${activeTab === 'framer' ? 'tab-framer' : ''}`}
              onClick={() => setActiveTab('framer')}
            >
              framer-motion
            </button>
            <button
              className={`tab-btn ${activeTab === 'gsap' ? 'tab-gsap' : ''}`}
              onClick={() => setActiveTab('gsap')}
            >
              gsap
            </button>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono'" }}>
            {activeTab === 'framer' ? '// React component' : '// useEffect hook'}
          </span>
        </div>

        <CodeBlock
          code={activeTab === 'framer' ? framerCode : gsapCode}
          language="typescript"
        />
      </div>
    </div>
  )
}
