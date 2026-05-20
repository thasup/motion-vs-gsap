'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

const LABELS = ['Design system', 'TypeScript', 'Animation', 'Performance', 'Testing', 'Accessibility']

function FramerStagger({ animKey }: { animKey: number }) {
  const itemControls = useMemo(() => LABELS.map(() => useAnimationControls()), [])

  useEffect(() => {
    itemControls.forEach((ctrl, i) => {
      ctrl.set({ x: -20, opacity: 0, scale: 0.94 })
      setTimeout(() => {
        ctrl.start({
          x: 0, opacity: 1, scale: 1,
          transition: { type: 'spring', stiffness: 240, damping: 18 }
        })
      }, 50 + i * 100)
    })
  }, [animKey])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', padding: '0 1rem' }}>
      {LABELS.map((label, i) => (
        <motion.div
          key={label}
          animate={itemControls[i]}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            background: `rgba(124,90,243,${0.06 + i * 0.025})`,
            border: '1px solid rgba(124,90,243,0.22)',
            fontSize: 12,
            fontFamily: "'JetBrains Mono'",
            color: 'var(--framer-light)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--framer)',
            flexShrink: 0,
          }} />
          {label}
        </motion.div>
      ))}
    </div>
  )
}

function GsapStagger({ animKey }: { animKey: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.gsap-stagger-item')
    gsap.set(items, { x: 20, opacity: 0, scale: 0.94 })
    gsap.to(items, {
      x: 0, opacity: 1, scale: 1,
      duration: 0.45,
      stagger: {
        each: 0.09,
        from: 'start',
        ease: 'power1.in',
      },
      ease: 'power2.out',
    })
  }, [animKey])

  return (
    <div
      ref={containerRef}
      style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', padding: '0 1rem' }}
    >
      {LABELS.map((label, i) => (
        <div
          key={label}
          className="gsap-stagger-item"
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            background: `rgba(136,206,2,${0.05 + i * 0.02})`,
            border: '1px solid rgba(136,206,2,0.2)',
            fontSize: 12,
            fontFamily: "'JetBrains Mono'",
            color: 'var(--gsap-light)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--gsap)',
            flexShrink: 0,
          }} />
          {label}
        </div>
      ))}
    </div>
  )
}

const framerCode = `// Stagger with Framer Motion — variants cascade
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const item = {
  hidden: { x: -20, opacity: 0, scale: 0.94 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 18,
    },
  },
}

// Parent propagates variants to children automatically
function List({ items }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li
          key={item.id}
          variants={item}    // inherits parent trigger
        >
          {item.label}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// ✓ Clean variant composition
// ✓ Children auto-inherit parent animation state
// ✓ Works with AnimatePresence for list mutations`

const gsapCode = `// Stagger with GSAP — explicit and powerful
function List({ items }) {
  const listRef = useRef(null)

  useEffect(() => {
    const els = listRef.current.querySelectorAll('li')

    gsap.set(els, { x: 20, opacity: 0, scale: 0.94 })

    gsap.to(els, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out',
      stagger: {
        each: 0.09,          // delay between each
        from: 'start',       // or 'end', 'center', 'edges',
                             //    'random', or an index
        ease: 'power1.in',   // easing of the stagger itself
        grid: 'auto',        // for 2D grids
        // amount: 0.5       // total time for all staggers
      },
    })
  }, [items]) // re-run when items change

  return (
    <ul ref={listRef}>
      {items.map(i => <li key={i.id}>{i.label}</li>)}
    </ul>
  )
}

// GSAP stagger options are far richer:
// grid layouts, radial staggers, random ordering`

export function StaggerDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="04"
      title="Stagger Animations"
      subtitle="Framer's variant system cascades naturally through the component tree. GSAP's stagger config is more powerful — supporting grids, radial patterns, and custom ordering."
      framerDemo={<FramerStagger animKey={framerKey} />}
      gsapDemo={<GsapStagger animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
