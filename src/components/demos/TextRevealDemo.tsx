'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

const TEXT = 'Smooth text reveal'

function FramerTextReveal({ animKey }: { animKey: number }) {
  const controls = useMemo(() => TEXT.split('').map(() => useAnimationControls()), [])

  useEffect(() => {
    controls.forEach((ctrl, i) => {
      ctrl.set({ opacity: 0, y: 20, scale: 0.8 })
      setTimeout(() => {
        ctrl.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
          },
        })
      }, i * 50)
    })
  }, [animKey])

  return (
    <div style={{ width: '100%', padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        fontSize: 20,
        fontWeight: 600,
        fontFamily: "'Outfit', sans-serif",
        display: 'flex',
        gap: 2,
      }}>
        {TEXT.split('').map((char, i) => (
          <motion.span
            key={i}
            animate={controls[i]}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function GsapTextReveal({ animKey }: { animKey: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.char')
    gsap.set(chars, { opacity: 0, y: 20, scale: 0.8 })

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.4)',
    })
  }, [animKey])

  return (
    <div style={{ width: '100%', padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div
        ref={containerRef}
        style={{
          fontSize: 20,
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          display: 'flex',
          gap: 2,
        }}
      >
        {TEXT.split('').map((char, i) => (
          <span
            key={i}
            className="char"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #5a8a01, #88ce02)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  )
}

const framerCode = `// Text reveal with Framer Motion
function TextReveal({ text }) {
  const chars = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex' }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Variant cascading makes stagger animations clean
// Also: split by words, lines with libs like react-split-text`

const gsapCode = `// Text reveal with GSAP
function TextReveal({ text }) {
  const ref = useRef(null)

  useEffect(() => {
    const chars = ref.current.querySelectorAll('.char')

    gsap.set(chars, {
      opacity: 0,
      y: 20,
      scale: 0.8,
    })

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: {
        each: 0.05,
        from: 'start',  // or 'end', 'center', 'random'
      },
      ease: 'back.out(1.4)',
    })
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ display: 'inline-block' }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

// GSAP SplitText plugin (premium) does this automatically
// with advanced line/word/char splitting`

export function TextRevealDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="10"
      title="Text Reveals & Character Animation"
      subtitle="Framer's variant stagger system shines for text animations. GSAP's premium SplitText plugin offers auto-splitting, but the free version requires manual markup."
      framerDemo={<FramerTextReveal animKey={framerKey} />}
      gsapDemo={<GsapTextReveal animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
