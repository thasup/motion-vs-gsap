'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

function FramerCardFlip({ animKey }: { animKey: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(false)
    const timer = setTimeout(() => setIsFlipped(true), 400)
    const timer2 = setTimeout(() => setIsFlipped(false), 1600)
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [animKey])

  return (
    <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1000 }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 140,
          height: 100,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontFamily: "'JetBrains Mono'",
          color: 'white',
          fontWeight: 600,
          border: '1px solid rgba(124,90,243,0.5)',
        }}>
          FRONT
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #a07ff6, #7c5af3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontFamily: "'JetBrains Mono'",
          color: 'white',
          fontWeight: 600,
          border: '1px solid rgba(124,90,243,0.5)',
        }}>
          BACK
        </div>
      </motion.div>
    </div>
  )
}

function GsapCardFlip({ animKey }: { animKey: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const tl = gsap.timeline()
    tl.set(cardRef.current, { rotationY: 0 })
    tl.to(cardRef.current, { rotationY: 180, duration: 0.6, ease: 'power2.inOut', delay: 0.4 })
    tl.to(cardRef.current, { rotationY: 360, duration: 0.6, ease: 'power2.inOut', delay: 0.6 })

    return () => { tl.kill() }
  }, [animKey])

  return (
    <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1000 }}>
      <div
        ref={cardRef}
        style={{
          width: 140,
          height: 100,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #5a8a01, #88ce02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontFamily: "'JetBrains Mono'",
          color: 'white',
          fontWeight: 600,
          border: '1px solid rgba(136,206,2,0.5)',
        }}>
          FRONT
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #88ce02, #5a8a01)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontFamily: "'JetBrains Mono'",
          color: 'white',
          fontWeight: 600,
          border: '1px solid rgba(136,206,2,0.5)',
        }}>
          BACK
        </div>
      </div>
    </div>
  )
}

const framerCode = `// 3D card flip with Framer Motion
function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front face */}
        <div style={{ backfaceVisibility: 'hidden' }}>
          Front content
        </div>

        {/* Back face */}
        <div style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}>
          Back content
        </div>
      </motion.div>
    </div>
  )
}

// Also works with rotateX for vertical flip
// Framer handles 3D transforms declaratively`

const gsapCode = `// 3D card flip with GSAP
function FlipCard() {
  const cardRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const flip = () => {
    gsap.to(cardRef.current, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: 'power2.inOut',
      transformStyle: 'preserve-3d',
    })
    setIsFlipped(!isFlipped)
  }

  return (
    <div style={{ perspective: 1000 }}>
      <div
        ref={cardRef}
        onClick={flip}
        style={{
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          Front
        </div>
        <div style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}>
          Back
        </div>
      </div>
    </div>
  )
}

// GSAP also supports rotationX, rotationZ, and
// combined 3D transforms with full control`

export function CardFlipDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="07"
      title="3D Card Flip & Transforms"
      subtitle="Both libraries handle 3D transforms well. Framer's declarative approach feels natural for state-driven flips. GSAP gives you imperative control over complex 3D sequences."
      framerDemo={<FramerCardFlip animKey={framerKey} />}
      gsapDemo={<GsapCardFlip animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}
