'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import ScrollTriggerPkg from 'gsap/ScrollTrigger'
const { ScrollTrigger } = ScrollTriggerPkg as any
import { DemoLayout } from '../DemoLayout'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { label: 'Scroll triggers state change', color: 'var(--framer)' },
  { label: 'useInView detects visibility', color: 'var(--framer-light)' },
  { label: 'animate prop responds', color: '#c4a8ff' },
]

const GSAP_ITEMS = [
  { label: 'ScrollTrigger watches viewport', color: 'var(--gsap)' },
  { label: 'onEnter callback fires', color: 'var(--gsap-light)' },
  { label: 'gsap.to() takes control', color: '#c8f04a' },
]

function ScrollItem({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ x: -30, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 180 }}
      style={{
        padding: '10px 14px',
        borderRadius: 7,
        border: '1px solid rgba(124,90,243,0.25)',
        background: 'rgba(124,90,243,0.06)',
        fontSize: 12,
        fontFamily: "'JetBrains Mono'",
        color: ITEMS[index % ITEMS.length].color,
        marginBottom: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
      {children}
    </motion.div>
  )
}

function FramerScrollDemo() {
  return (
    <div style={{ width: '100%', padding: '1rem', overflowY: 'auto', maxHeight: 160 }}>
      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', marginBottom: 10 }}>
        scroll container ↓
      </div>
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <ScrollItem key={i} index={i % 3}>{item.label}</ScrollItem>
      ))}
    </div>
  )
}

function GsapScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.gsap-scroll-item')

    gsap.set(items, { x: 30, opacity: 0 })

    items.forEach((item, i) => {
      gsap.to(item, {
        x: 0, opacity: 1,
        duration: 0.5,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          scroller: containerRef.current,
          start: 'top bottom-=20',
          toggleActions: 'play reverse play reverse',
        },
      })
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [key])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', padding: '1rem', overflowY: 'auto', maxHeight: 160, position: 'relative' }}
    >
      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', marginBottom: 10 }}>
        scroll container ↓
      </div>
      {[...GSAP_ITEMS, ...GSAP_ITEMS].map((item, i) => (
        <div
          key={`${key}-${i}`}
          className="gsap-scroll-item"
          style={{
            padding: '10px 14px',
            borderRadius: 7,
            border: '1px solid rgba(136,206,2,0.22)',
            background: 'rgba(136,206,2,0.05)',
            fontSize: 12,
            fontFamily: "'JetBrains Mono'",
            color: GSAP_ITEMS[i % 3].color,
            marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
          {item.label}
        </div>
      ))}
    </div>
  )
}

const framerCode = `// Scroll-triggered animation with Framer Motion
import { motion, useInView } from 'framer-motion'

function RevealItem({ children }) {
  const ref = useRef(null)
  // useInView tracks when element enters viewport
  const isInView = useInView(ref, {
    once: false,       // re-trigger on scroll out/in
    margin: '-40px',   // fire 40px before edge
  })

  return (
    <motion.div
      ref={ref}
      initial={{ x: -30, opacity: 0 }}
      animate={isInView
        ? { x: 0, opacity: 1 }
        : { x: -30, opacity: 0 }  // reverse on scroll out
      }
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {children}
    </motion.div>
  )
}

// Also: useScroll + useTransform for parallax
// const { scrollYProgress } = useScroll()
// const y = useTransform(scrollYProgress, [0, 1], [0, -100])`

const gsapCode = `// Scroll-triggered animation with GSAP ScrollTrigger
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function RevealItems() {
  const el = useRef(null)

  useEffect(() => {
    gsap.set('.item', { x: 30, opacity: 0 })

    gsap.to('.item', {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el.current,
        start: 'top 80%',         // when to fire
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
        // scrub: true            // tie to scroll position
        // pin: true              // pin element while animating
      },
    })
  }, [])

  return <div ref={el}>{items}</div>
}

// ScrollTrigger is far more powerful: scrubbing,
// pinning, snapping, and timeline scrubbing`

export function ScrollDemo() {
  return (
    <DemoLayout
      number="02"
      title="Scroll-Triggered Animations"
      subtitle="Where the gap starts to widen. Framer's useInView covers most cases cleanly. GSAP's ScrollTrigger is a full scroll choreography system with scrubbing, pinning, and snapping."
      framerDemo={<FramerScrollDemo />}
      gsapDemo={<GsapScrollDemo />}
      framerCode={framerCode}
      gsapCode={gsapCode}
    />
  )
}
