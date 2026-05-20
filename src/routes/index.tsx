import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Philosophy } from '../components/Philosophy'
import { EntranceDemo } from '../components/demos/EntranceDemo'
import { ScrollDemo } from '../components/demos/ScrollDemo'
import { DragDemo } from '../components/demos/DragDemo'
import { StaggerDemo } from '../components/demos/StaggerDemo'
import { TimelineDemo } from '../components/demos/TimelineDemo'
import { SVGDemo } from '../components/demos/SVGDemo'
import { CardFlipDemo } from '../components/demos/CardFlipDemo'
import { MagneticDemo } from '../components/demos/MagneticDemo'
import { CounterDemo } from '../components/demos/CounterDemo'
import { TextRevealDemo } from '../components/demos/TextRevealDemo'
import { ComparisonTable } from '../components/ComparisonTable'
import { DecisionGuide } from '../components/DecisionGuide'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2.5rem 0 1rem' }}>
      <div className="divider" style={{ flex: 1 }} />
      <span className="section-label">{label}</span>
      <div className="divider" style={{ flex: 1 }} />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Nav />
      <Hero />

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 2rem' }}>
        <Philosophy />

        <SectionDivider label="Use Cases & Code Patterns" />

        <section id="entrance" style={{ marginBottom: '5rem' }}>
          <EntranceDemo />
        </section>

        <div className="divider" />

        <section id="scroll" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <ScrollDemo />
        </section>

        <div className="divider" />

        <section id="drag" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <DragDemo />
        </section>

        <div className="divider" />

        <section id="stagger" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <StaggerDemo />
        </section>

        <div className="divider" />

        <section id="timeline" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <TimelineDemo />
        </section>

        <div className="divider" />

        <section id="svg" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <SVGDemo />
        </section>

        <div className="divider" />

        <section id="cardflip" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <CardFlipDemo />
        </section>

        <div className="divider" />

        <section id="magnetic" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <MagneticDemo />
        </section>

        <div className="divider" />

        <section id="counter" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <CounterDemo />
        </section>

        <div className="divider" />

        <section id="textreveal" style={{ marginBottom: '5rem', marginTop: '5rem' }}>
          <TextRevealDemo />
        </section>

        <SectionDivider label="Feature Matrix" />

        <section id="comparison" style={{ marginBottom: '5rem' }}>
          <ComparisonTable />
        </section>

        <SectionDivider label="Decision Guide" />

        <section id="decision" style={{ marginBottom: '6rem' }}>
          <DecisionGuide />
        </section>
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        fontSize: 12,
        color: 'var(--text-dim)',
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.06em',
      }}>
        framer-motion@12 · gsap@3 · built for engineering decisions · 2025
      </footer>
    </>
  )
}
