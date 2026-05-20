'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

function FramerMagnetic({ animKey }: { animKey: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.3
    const offsetY = (e.clientY - centerY) * 0.3
    x.set(offsetX)
    y.set(offsetY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  useEffect(() => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }, [animKey])

  return (
    <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 120,
          height: 120,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
          border: '1px solid rgba(124,90,243,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          x: springX,
          y: springY,
        }}
      >
        <motion.span
          animate={{ scale: isHovered ? 1.1 : 1 }}
          style={{
            fontSize: 10,
            fontFamily: "'JetBrains Mono'",
            color: 'white',
            fontWeight: 600,
          }}
        >
          HOVER ME
        </motion.span>
      </motion.div>
    </div>
  )
}

function GsapMagnetic({ animKey }: { animKey: number }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const offsetX = (e.clientX - centerX) * 0.3
      const offsetY = (e.clientY - centerY) * 0.3

      gsap.to(button, {
        x: offsetX,
        y: offsetY,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
      setIsHovered(false)
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mouseenter', () => setIsHovered(true))

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [animKey])

  return (
    <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        ref={buttonRef}
        style={{
          width: 120,
          height: 120,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #5a8a01, #88ce02)',
          border: '1px solid rgba(136,206,2,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontSize: 10,
          fontFamily: "'JetBrains Mono'",
          color: 'white',
          fontWeight: 600,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s',
        }}>
          HOVER ME
        </span>
      </div>
    </div>
  )
}

const framerCode = `// Magnetic button with Framer Motion
import { useMotionValue, useSpring } from 'framer-motion'

function MagneticButton() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Add spring physics for smooth follow
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate offset from center
    const offsetX = (e.clientX - centerX) * 0.3
    const offsetY = (e.clientY - centerY) * 0.3

    x.set(offsetX)
    y.set(offsetY)
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: springX, y: springY }}
    >
      Follow cursor
    </motion.button>
  )
}

// useMotionValue + useSpring = buttery smooth tracking`

const gsapCode = `// Magnetic button with GSAP
function MagneticButton() {
  const buttonRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const offsetX = (e.clientX - centerX) * 0.3
      const offsetY = (e.clientY - centerY) * 0.3

      gsap.to(button, {
        x: offsetX,
        y: offsetY,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <button ref={buttonRef}>Follow cursor</button>
}

// GSAP's elastic ease makes for playful returns`

export function MagneticDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="08"
      title="Magnetic / Cursor-Following Effects"
      subtitle="Framer's useMotionValue + useSpring combo is built for this. GSAP requires manual event handling but gives you full control over the physics and easing curves."
      framerDemo={<FramerMagnetic animKey={framerKey} />}
      gsapDemo={<GsapMagnetic animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
