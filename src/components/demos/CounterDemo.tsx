'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

function FramerCounter({ animKey }: { animKey: number }) {
  const count = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    count.set(0)
    const timer = setTimeout(() => count.set(9847), 200)
    return () => clearTimeout(timer)
  }, [animKey, count])

  return (
    <div style={{ width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        fontSize: 48,
        fontWeight: 700,
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
      }}>
        <motion.span>{display}</motion.span>
      </div>
      <div style={{
        fontSize: 10,
        fontFamily: "'JetBrains Mono'",
        color: 'var(--framer-light)',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        Active users
      </div>
    </div>
  )
}

function GsapCounter({ animKey }: { animKey: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const counterRef = useRef({ value: 0 })

  useEffect(() => {
    counterRef.current.value = 0
    setDisplayValue(0)

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to(counterRef.current, {
      value: 9847,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.round(counterRef.current.value))
      },
    })

    return () => { tl.kill() }
  }, [animKey])

  return (
    <div style={{ width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        fontSize: 48,
        fontWeight: 700,
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(135deg, #5a8a01, #88ce02)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
      }}>
        {displayValue.toLocaleString()}
      </div>
      <div style={{
        fontSize: 10,
        fontFamily: "'JetBrains Mono'",
        color: 'var(--gsap-light)',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        Active users
      </div>
    </div>
  )
}

const framerCode = `// Number counter with Framer Motion
import { useSpring, useTransform } from 'framer-motion'

function Counter({ targetValue }) {
  const count = useSpring(0, {
    stiffness: 50,    // Lower = slower acceleration
    damping: 20,      // Higher = less bounce
  })

  // Transform motion value to rounded display
  const display = useTransform(
    count,
    (latest) => Math.round(latest).toLocaleString()
  )

  useEffect(() => {
    count.set(targetValue)
  }, [targetValue])

  return (
    <motion.div style={{ fontSize: 48 }}>
      {display}
    </motion.div>
  )
}

// useSpring provides natural acceleration/deceleration
// useTransform formats the value without re-renders
// Perfect for stats dashboards, counters, progress`

const gsapCode = `// Number counter with GSAP
function Counter({ targetValue }) {
  const [display, setDisplay] = useState(0)
  const counterRef = useRef({ value: 0 })

  useEffect(() => {
    gsap.to(counterRef.current, {
      value: targetValue,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplay(
          Math.round(counterRef.current.value)
        )
      },
    })
  }, [targetValue])

  return (
    <div style={{ fontSize: 48 }}>
      {display.toLocaleString()}
    </div>
  )
}

// GSAP can tween any numeric value
// onUpdate callback for React state sync
// Also works for: currency, percentages, decimals
// Pair with scrambleText plugin for extra flair`

export function CounterDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="09"
      title="Number Counters & Value Tweening"
      subtitle="Both libraries excel at numeric tweening. Framer's useSpring + useTransform approach is more React-idiomatic. GSAP's onUpdate callback gives you raw control."
      framerDemo={<FramerCounter animKey={framerKey} />}
      gsapDemo={<GsapCounter animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
