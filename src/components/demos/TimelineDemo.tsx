'use client'
import { useState, useEffect, useRef } from 'react'
import { useAnimate } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

function FramerTimeline({ animKey }: { animKey: number }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (cancelled) return
      
      await animate('#logo', { scale: 0, opacity: 0 }, { duration: 0 })
      await animate('#line1', { x: -40, opacity: 0 }, { duration: 0 })
      await animate('#line2', { x: -40, opacity: 0 }, { duration: 0 })
      await animate('#badge', { y: 12, opacity: 0 }, { duration: 0 })
      await animate('#glow', { opacity: 0 }, { duration: 0 })

      if (cancelled) return
      await animate('#logo', { scale: [0, 1.2, 1], opacity: [0, 1] }, { duration: 0.5 })
      if (cancelled) return
      await animate('#line1', { x: [-40, 0], opacity: [0, 1] }, { duration: 0.35 })
      if (cancelled) return
      await animate('#line2', { x: [-40, 0], opacity: [0, 1] }, { duration: 0.3 })
      if (cancelled) return
      await animate('#badge', { y: [12, 0], opacity: [0, 1] }, { duration: 0.3 })
      if (cancelled) return
      await animate('#glow', { opacity: [0, 1, 0] }, { duration: 0.8 })
    }
    
    run()

    return () => {
      cancelled = true
    }
  }, [animKey])

  return (
    <div ref={scope} style={{ width: '100%', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <div
          id="logo"
          style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
            opacity: 0,
          }}
        />
        <div
          id="line1"
          style={{
            height: 10, width: '75%', borderRadius: 5,
            background: 'rgba(124,90,243,0.4)',
            opacity: 0,
          }}
        />
        <div
          id="line2"
          style={{
            height: 8, width: '55%', borderRadius: 4,
            background: 'rgba(124,90,243,0.2)',
            opacity: 0,
          }}
        />
        <div
          id="badge"
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            border: '1px solid rgba(124,90,243,0.4)',
            background: 'var(--framer-dim)',
            fontSize: 10,
            fontFamily: "'JetBrains Mono'",
            color: 'var(--framer-light)',
            opacity: 0,
          }}
        >
          sequence complete
        </div>
        <div
          id="glow"
          style={{
            width: '100%', height: 2, borderRadius: 1,
            background: 'linear-gradient(90deg, transparent, var(--framer), transparent)',
            opacity: 0,
          }}
        />
      </div>
    </div>
  )
}

function GsapTimeline({ animKey }: { animKey: number }) {
  const logoRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set([logoRef.current, line1Ref.current, line2Ref.current, badgeRef.current, glowRef.current], {
      opacity: 0,
    })

    tl.fromTo(logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
    )
    .fromTo(line1Ref.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo(line2Ref.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
      '-=0.15'
    )
    .fromTo(badgeRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 }
    )
    .fromTo(glowRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power1.out' }
    )
    .to(glowRef.current, { opacity: 0, duration: 0.4 })

    return () => { tl.kill() }
  }, [animKey])

  return (
    <div style={{ width: '100%', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <div
          ref={logoRef}
          style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'linear-gradient(135deg, #5a8a01, #88ce02)',
          }}
        />
        <div
          ref={line1Ref}
          style={{
            height: 10, width: '75%', borderRadius: 5,
            background: 'rgba(136,206,2,0.35)',
          }}
        />
        <div
          ref={line2Ref}
          style={{
            height: 8, width: '55%', borderRadius: 4,
            background: 'rgba(136,206,2,0.2)',
          }}
        />
        <div
          ref={badgeRef}
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            border: '1px solid rgba(136,206,2,0.35)',
            background: 'var(--gsap-dim)',
            fontSize: 10,
            fontFamily: "'JetBrains Mono'",
            color: 'var(--gsap-light)',
          }}
        >
          timeline complete
        </div>
        <div
          ref={glowRef}
          style={{
            width: '100%', height: 2, borderRadius: 1,
            background: 'linear-gradient(90deg, transparent, var(--gsap), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  )
}

const framerCode = `// Complex sequence with Framer Motion useAnimate
import { useAnimate } from 'framer-motion'

function CardReveal() {
  const [scope, animate] = useAnimate()

  const runSequence = async () => {
    // await = wait for each step to finish
    await animate('#logo',
      { scale: [0, 1.2, 1], opacity: [0, 1] },
      { duration: 0.5 }
    )
    await animate('#title',
      { x: [-40, 0], opacity: [0, 1] },
      { duration: 0.35 }
    )
    // Run in parallel with previous
    animate('#subtitle',
      { x: [-40, 0], opacity: [0, 1] },
      { duration: 0.3, delay: 0.05 }
    )
    await animate('#badge',
      { y: [12, 0], opacity: [0, 1] },
      { duration: 0.3 }
    )
  }

  useEffect(() => { runSequence() }, [])

  return (
    <div ref={scope}>
      <div id="logo" />
      <h2 id="title" />
      <p id="subtitle" />
      <span id="badge" />
    </div>
  )
}

// Limitation: no "position" offset like GSAP's '-=0.2'
// Sequences are async/await-based, not timeline-scrubable`

const gsapCode = `// Complex sequence with GSAP timeline
function CardReveal() {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => console.log('done'),
      })

      tl.from('#logo',
        { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.4)' }
      )
      // '-=0.1' overlaps with previous by 100ms
      .from('#title',
        { x: -40, opacity: 0, duration: 0.35 }, '-=0.1'
      )
      .from('#subtitle',
        { x: -40, opacity: 0, duration: 0.3 }, '-=0.15'
      )
      .from('#badge',
        { y: 12, opacity: 0, duration: 0.3 }
      )

      // Full scrub support:
      // tl.seek(0.5)     // jump to 0.5s
      // tl.progress(0.5) // jump to 50%
      // tl.reverse()     // play backwards
      // tl.timeScale(2)  // 2x speed
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={scope}>...</div>
  )
}

// GSAP timelines are first-class: scrubable, reversible,
// nestable, and can be paused mid-flight`

export function TimelineDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="05"
      title="Complex Sequences & Timelines"
      subtitle="This is GSAP's home territory. Timeline scrubbing, position offsets, nested timelines, and mid-flight pause/reverse are all first-class. Framer's useAnimate covers most cases but lacks timeline scrubbing."
      framerDemo={<FramerTimeline animKey={framerKey} />}
      gsapDemo={<GsapTimeline animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
