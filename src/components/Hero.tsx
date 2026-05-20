'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

function FramerHeroDemo() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.08 : 1,
          rotate: clicked ? [0, -4, 4, 0] : 0,
          boxShadow: hovered
            ? '0 0 40px rgba(124,90,243,0.5), 0 0 0 1px rgba(124,90,243,0.4)'
            : '0 0 0 0 transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => {
          setClicked(true)
          setTimeout(() => setClicked(false), 600)
        }}
        style={{
          width: 80, height: 80,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.9)', borderRadius: 4 }}
        />
      </motion.div>

      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: hovered ? -6 : 0, opacity: hovered ? 1 : 0.4 }}
            transition={{ type: 'spring', stiffness: 300, delay: i * 0.06 }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--framer)' }}
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 4 }}
        style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono'", margin: 0 }}
      >
        {hovered ? 'state changed → motion follows' : 'hover to interact'}
      </motion.p>
    </div>
  )
}

function GsapHeroDemo() {
  const box1 = useRef<HTMLDivElement>(null)
  const box2 = useRef<HTMLDivElement>(null)
  const box3 = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

    gsap.set([box1.current, box2.current, box3.current, label.current], {
      opacity: 0, y: 20,
    })

    tl.to(box1.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
      .to(box2.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .to(box3.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .to([box1.current, box2.current, box3.current], {
        scale: 1.06, stagger: 0.08, duration: 0.3, ease: 'power1.inOut', yoyo: true, repeat: 1,
      }, '+=0.3')
      .to(label.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.3')
      .to([box1.current, box2.current, box3.current, label.current], {
        opacity: 0, y: -12, stagger: 0.05, duration: 0.3, delay: 0.8,
      })

    return () => { tl.kill() }
  }, [key])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
        {[
          { ref: box1, h: 60, color: '#88ce02' },
          { ref: box2, h: 80, color: '#a8e520' },
          { ref: box3, h: 50, color: '#68a802' },
        ].map((item, i) => (
          <div
            key={i}
            ref={item.ref}
            style={{
              width: 36,
              height: item.h,
              borderRadius: 6,
              background: `${item.color}22`,
              border: `1px solid ${item.color}`,
            }}
          />
        ))}
      </div>
      <p
        ref={label}
        style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono'", margin: 0 }}
      >
        timeline → sequence → repeat
      </p>
    </div>
  )
}

export function Hero() {
  return (
    <div className="hero-wrap">
      {/* Framer side */}
      <div className="hero-side hero-side-left">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(124,90,243,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <span className="framer-badge">Framer Motion</span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', maxWidth: 360, textAlign: 'center' }}>
          Declarative.<br />
          <span style={{ color: 'var(--framer-light)' }}>React-native.</span><br />
          State-driven.
        </h2>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 300, textAlign: 'center', lineHeight: 1.65 }}>
          Motion is a side effect of state. Components <em>are</em> animations.
          The React mental model never breaks.
        </p>

        <div className="demo-stage" style={{ width: '100%', maxWidth: 320, minHeight: 180 }}>
          <FramerHeroDemo />
        </div>

        <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)' }}>
          {'<motion.div animate={{ scale: 1.1 }} />'}
        </div>
      </div>

      {/* GSAP side */}
      <div className="hero-side">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(136,206,2,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <span className="gsap-badge">GSAP</span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', maxWidth: 360, textAlign: 'center' }}>
          Imperative.<br />
          <span style={{ color: 'var(--gsap-light)' }}>DOM-native.</span><br />
          Timeline-first.
        </h2>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 300, textAlign: 'center', lineHeight: 1.65 }}>
          Timelines orchestrate everything. The DOM is the canvas.
          Any framework, or no framework at all.
        </p>

        <div className="demo-stage" style={{ width: '100%', maxWidth: 320, minHeight: 180 }}>
          <GsapHeroDemo />
        </div>

        <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)' }}>
          {'gsap.timeline().to(el, { y: 0 })'}
        </div>
      </div>

      {/* Center label */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        background: 'var(--bg)',
        border: '1px solid var(--border-2)',
        borderRadius: 24,
        padding: '6px 16px',
        fontSize: 11,
        fontFamily: "'JetBrains Mono'",
        color: 'var(--text-dim)',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
      }}>
        vs
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 24, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          style={{ width: 1, height: 24, background: 'var(--border-2)' }}
        />
      </div>
    </div>
  )
}
