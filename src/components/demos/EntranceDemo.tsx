'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

function FramerEntrance({ animKey }: { animKey: number }) {
  const controls = useMemo(() => [useAnimationControls(), useAnimationControls(), useAnimationControls()], [])

  useEffect(() => {
    const types = ['scale', 'slide', 'fade']
    controls.forEach((ctrl, i) => {
      const type = types[i]
      const initial = 
        type === 'scale' ? { scale: 0, opacity: 0 }
        : type === 'slide' ? { x: -40, opacity: 0 }
        : { opacity: 0 }
      
      const animate =
        type === 'scale' ? { scale: 1, opacity: 1 }
        : type === 'slide' ? { x: 0, opacity: 1 }
        : { opacity: 1 }

      ctrl.set(initial)
      setTimeout(() => {
        ctrl.start({ ...animate, transition: { duration: 0.5, type: 'spring', stiffness: 200, damping: 18 } })
      }, i * 150)
    })
  }, [animKey])

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {['scale', 'slide', 'fade'].map((type, i) => (
        <motion.div
          key={i}
          animate={controls[i]}
          style={{
            width: 60, height: 60, borderRadius: 10,
            background: `rgba(124,90,243,${0.3 + i * 0.2})`,
            border: '1px solid rgba(124,90,243,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono'", color: 'var(--framer-light)' }}>{type}</span>
        </motion.div>
      ))}
    </div>
  )
}

function GsapEntrance({ animKey }: { animKey: number }) {
  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  useEffect(() => {
    const els = refs.map(r => r.current).filter(Boolean)
    gsap.set(els, { opacity: 0, scale: 0.5, y: 20 })
    gsap.to(els, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.4)',
    })
  }, [animKey])

  const types = ['scale', 'slide', 'fade']
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {types.map((type, i) => (
        <div
          key={i}
          ref={refs[i]}
          style={{
            width: 60, height: 60, borderRadius: 10,
            background: `rgba(136,206,2,${0.15 + i * 0.15})`,
            border: '1px solid rgba(136,206,2,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono'", color: 'var(--gsap-light)' }}>{type}</span>
        </div>
      ))}
    </div>
  )
}

const framerCode = `// Entrance animation with Framer Motion
function EntranceBox() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
        delay: 0.15,
      }}
    >
      Hello
    </motion.div>
  )
}

// Multiple elements: just add delay
// No refs, no useEffect, no imperative code
// initial/animate describe states — Framer interpolates`

const gsapCode = `// Entrance animation with GSAP
function EntranceBox() {
  const el = useRef(null)

  useEffect(() => {
    // Set starting state
    gsap.set(el.current, { scale: 0, opacity: 0 })

    // Animate to target
    gsap.to(el.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      delay: 0.15,
      ease: 'back.out(1.4)',
    })
  }, [])

  return <div ref={el}>Hello</div>
}

// Multiple elements: stagger option
gsap.to('.boxes', { opacity: 1, stagger: 0.15 })`

export function EntranceDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="01"
      title="Entrance Animations"
      subtitle="The simplest and most common case — elements appearing on screen. Both produce nearly identical results. The difference is entirely in how you think about it."
      framerDemo={<FramerEntrance animKey={framerKey} />}
      gsapDemo={<GsapEntrance animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
